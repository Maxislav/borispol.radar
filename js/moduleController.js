"use strict";
define(['getimage-src'],
  /**
   *
   * @param {Function}getImageSrc
   * @returns {}
   */
  function (getImageSrc) {

  return {
    el: null,
    elpanel: null,
    arrimg: [],
    state: {},
    steps: 9,
    btnPlay: null,
    btnRefresh: null,
    btnStepBask: null,
    btnStepForward: null,
    moduleName: 'ired',
    errSrc: '',
    baseURI: 'img/sat',
    active: false,
    afterUrl: '&ir=true',
    clip: null,
    container: null,
    imgir: null,
    progressLoader: null,
    progressBar: null,
    navTabs: 1,
    offset: 15,
    errLoadI: 0,
    init: function (html, success, elLi) {
      var s = this;
      s.elLi = elLi;

      s.el = $(document.createElement('div')).html(html).css({
        opacity: 0
      });
      $(document).find('.content').append(s.el);
      s.btnPlay = s.el.find('.glyphicon.glyphicon-play');
      s.btnRefresh = s.el.find('.glyphicon.glyphicon-refresh');
      s.btnStepBask = s.el.find('.glyphicon.glyphicon-step-backward');
      s.btnStepForward = s.el.find('.glyphicon.glyphicon-step-forward');
      s.progressLoader = s.el.find('.progress-loader');
      s.progressBar = s.el.find('.progress-bar');
      s.elpanel = s.el.find('.panel-drive');
      s.elpanel
        .on('click', '.glyphicon-play', function () {
          if (s.active) return
          s.play();
          s.active = true;
        })
        .on('click', '.glyphicon-refresh', function () {
          s.refresh()
        })
        .on('click', '.glyphicon.glyphicon-step-backward', function () {
          if (s.btnStepBask.active) return;
          s.btnStepBask.addClass('active');
          s.btnStepBask.active = true;
          s.stepBack()
        })
        .on('click', '.glyphicon.glyphicon-step-forward', function () {
          if (s.btnStepForward.active) return;
          s.btnStepForward.addClass('active');
          s.btnStepForward.active = true;
          s.stepForward()
        });
      s.showImg();
      s._init && s._init();
      success && success.call(s);
    },

    showImg: function (errSrc) {
      var s = this;
      var conteiner = s.container = s.el.find('.container-imgs-ir');
      var mask = app.mask.show(conteiner);
      var date = s.getDate();
      var src = s.baseURI + date + s.afterUrl;
      var url;

      if (s.baseURI.match(/^http/)) {
        return getImageSrc(src)
          .then(setImg)
      } else {
        url = 'http://' + window.location.hostname + window.location.pathname + (errSrc || src);
        return this.loadImage(url)
          .then(setImg)
      }
      function setImg(img) {
        conteiner.append(img);
        $(img).fadeTo(500, 1, function () {
          app.mask.remove(mask)
        })
      }
    },
    loadImage: function (src) {
      const s = this;
      if (s.baseURI.match(/^http/)) {
        return getImageSrc(src)
      }
      return new Promise((resolve, reject)=> {

        const img = new Image();
        img.addEventListener('error', error);
        img.addEventListener('load', contrast);
        var w = new Worker('js/worker-getimage-simple.js');
        let url
        if (src.match(/^http/)) {
          url = src
        }else{
          url = 'http://'+ window.location.hostname + window.location.pathname + (src);
        }

        w.postMessage([url]);
        w.onmessage = (e)=> {
          const arrayBuffer = e.data;
          if (!arrayBuffer) {
            resolve(new Image());
            return;
          }
          var blob = new Blob([arrayBuffer], {type: "image/jpeg"});
          var urlCreator = window.URL || window.webkitURL;
          img.src = urlCreator.createObjectURL(blob);
        };
        function error() {
          resolve(null)
        }

        function contrast() {
          const _img = this;
          img.removeEventListener('load', contrast)

          const elCanvas = document.createElement('canvas');
          elCanvas.width = _img.width;
          elCanvas.height = _img.height;
          elCanvas.setAttribute('width', _img.width);
          elCanvas.setAttribute('height', _img.height);
          const context = elCanvas.getContext('2d');
          context.drawImage(_img, 0, 0);
          const imgData = context.getImageData(0, 0, _img.width, _img.height);
          const w = new Worker('js/worker-contrast-img.js')
          w.postMessage([imgData.data]);
          w.onmessage = (e)=> {
            imgData.data.set(e.data[0]);
            context.putImageData(imgData, 0, 0);
            img.src = elCanvas.toDataURL()
            resolve(img)
          };
        }

      });
    },
    load: function (success) {
      var s = this;
      var arr = s.arrimg;
      var steps = s.steps;
      var k = 0;
      var offset = 0;
      s.progressLoader.fadeTo(222, 1);

      //this.loadImage()


      const progress = (k) => {
        s.progressBar.css({
          width: Math.ceil(k * 100 / steps) + '%'
        });
      };

      const arrPromises = [];
      for (var i = 0; i < steps; i++) {
        offset += s.offset;
        var date = s.getStepDate(offset);
        var url = s.baseURI + date + s.afterUrl;
        arrPromises.push(this.loadImage(url)
          .then((img)=> {
            progress(++k);
            return img
          })
        )
      }
      Promise.all(arrPromises)
        .then(imgs=> {
          s.progressLoader.fadeTo(222, 0);
          imgs.reverse();
          $(s.imgir).remove();
          imgs.forEach(img=> {
            s.container.append(img);
            $(img).css({'opacity': 1})
          });

          s.arrimg = imgs;
          success && success.call(s)
        });
    },
    play: function () {
      var s = this;
      s.btnPlay.addClass('active');
      if (!s.arrimg.length) {
        s.load(s.play);
        return
      }

      var steps = s.steps;
      var arrimg = s.arrimg;
      var k = 0;
      for (var i = 1; i < steps; i++) {
        $(arrimg[i]).fadeTo(400, 0, start)
      }
      function start() {
        k++;
        if (k == steps - 1) {
          k = 1;
          setTimeout(play, 500)
        }
      }

      function play() {
        $(arrimg[k]).fadeTo(200, 0.2, function () {
          s.clip = k;
          toFade(k);
          if (k < steps) {
            k++;
            play()
          } else {

          }
          if (k == steps) {
            s.active = false;
            s.btnPlay.removeClass('active')
          }
        })
      }

      function toFade(i) {
        $(arrimg[i]).fadeTo(400, 1)
      }
    },
    refresh: function () {
      var s = this;
      if (s.arrimg.length) {
        for (var i = 0; i < s.arrimg.length; i++) {
          $(s.arrimg[i]).fadeTo(222, 0, function () {
            $(this).remove()
          })
        }

      }
      if (s.imgir) {
        $(s.imgir).fadeTo(222, 0, function () {
          $(this).remove()
        })
      }
      setTimeout(function () {
        s.arrimg = [];
        s.imgir = null;
        s.showImg();
      }, 300)
    },
    stepBack: function () {
      var s = this;
      if (!s.arrimg.length) {
        s.load(s.stepBack);
        return
      }
      if (s.clip && 0 < s.clip) {
        $(s.arrimg[s.clip]).fadeTo(222, 0, function () {
          s.clip--;
          s.btnStepBask.active = false;
          s.btnStepBask.removeClass('active')
        })
      } else {
        s.btnStepBask.active = false;
        s.btnStepBask.removeClass('active')
      }
    },
    stepForward: function () {
      var s = this;
      if (!s.arrimg.length) {
        s.load(s.stepForward)
        return
      }
      if (s.clip < s.steps - 1) {
        s.clip++;
        $(s.arrimg[s.clip]).fadeTo(222, 1, function () {

          s.btnStepForward.active = false;
          s.btnStepForward.removeClass('active')
        })
      } else {
        s.btnStepForward.active = false;
        s.btnStepForward.removeClass('active')
      }
    },
    getDate: function () {
      var date = mathDate.setParams({mi: 15, ss: 60})(new Date(), {hh: -2, mi: -5})
      date = DateFormat.format.date(date, 'yyyyMMddHHmm');
      return date
    },
    getStepDate: function (offset) {
      var date = mathDate.setParams({mi: 15, ss: 60})(new Date(), {hh: -2, mi: -2 - (offset)})
      date = DateFormat.format.date(date, 'yyyyMMddHHmm');
      return date
    },
    show: function (html, elLi) {
      var s = this;
      if (!s.el) {

        s.init.call(s, html, s.show, elLi);
        //s.elLi =  s.elLi || elLi;
        return
      }

      s.el.css({
        display: 'block'
      });
      s.el.fadeTo(222, 1);

    },
    hide: function () {
      var s = this;

      s.el.fadeTo(222, 0, function () {
        s.el.css({
          display: 'none'
        })
      })
    }
  };

})
