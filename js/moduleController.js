var ModuleController = {
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
  baseURI: 'http://www.sat24.com/image2.ashx?region=eu&time=',
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
    var imgir = new Image();
    s.imgir = imgir;
    imgir.onerror = function (e) {
      s.errLoadI++;
      console.error('Error load: ' + src, e)
      if (s.errLoadI < 3) {
        s.showImg(s.errSrc);
        $.ajax({
          url: 'php/saveimgs.php',
          success: function (img) {
            console.log(img)
          }
        })
      }
    };

    imgir.addEventListener('load', contrast)
    var w = new Worker('js/worker-getimage-simple.js');
    const url = 'http://'+ window.location.hostname + window.location.pathname + (errSrc || src)
    w.postMessage([url]);
    w.onmessage = (e)=>{
      //console.log(e.data)
      const arrayBuffer = e.data;
      var blob = new Blob( [ arrayBuffer ], { type: "image/jpeg" } );
      var urlCreator = window.URL || window.webkitURL;
      imgir.src = urlCreator.createObjectURL( blob );
    };
    function contrast() {
      const img = this;
      imgir.removeEventListener('load', contrast)

      const elCanvas = document.createElement('canvas');
      elCanvas.width = img.width;
      elCanvas.height = img.height;
      elCanvas.setAttribute('width', img.width);
      elCanvas.setAttribute('height', img.height);
      const context = elCanvas.getContext('2d');
      context.drawImage(img, 0, 0);
      const imgData =  context.getImageData(0,0,img.width, img.height);
      const w = new Worker('js/worker-contrast-img.js')
     // const  arrayBuffer = new Uint16Array(arrData).buffer
      w.postMessage([imgData.data]);

      w.onmessage = (e)=>{
        imgData.data.set(e.data[0]);
        context.putImageData(imgData, 0, 0);
        imgir.src = elCanvas.toDataURL()


        conteiner.append(imgir);
         $(imgir).fadeTo(500, 1, function () {
         app.mask.remove(mask)
         })
      };
    }
  },

  load: function (success) {
    var s = this;
    var arr = s.arrimg;
    var steps = s.steps;
    var k = 0;
    var offset = 0;
    s.progressLoader.fadeTo(222, 1);
    for (var i = 0; i < steps; i++) {
      offset += s.offset;
      var date = s.getStepDate(offset);
      var url = s.baseURI + date + s.afterUrl;
      arr[i] = new Image();
      arr[i].onload = ok;

      arr[i].onerror = function (e) {
        err(e, url);
      }
      arr[i].src = url
      //console.log(url)
    }

    function err(e, url) {
      console.log('%c Error load: ' + e.type + ': ' + url, 'background: rgba(0,0,0,0.2); color: #FF0000')
      ok();
    }

    function ok() {
      k++;
      s.progressBar.css({
        width: Math.ceil(k * 100 / steps) + '%'
      });
      if (k == steps) {
        var _arr = [];
        for (var i = 0; i < steps; i++) {
          _arr.push(arr[i])
        }
        for (var i = 0; i < steps; i++) {

          s.arrimg[steps - i - 1] = _arr[i]
        }
        $(s.imgir).remove();
        for (var i = 0; i < steps; i++) {
          //  console.log(s.arrimg[i].src)
          s.container.append(s.arrimg[i]);
          $(s.arrimg[i]).css({'opacity': 1})
        }
        s.clip = steps - 1;
        s.progressLoader.fadeTo(222, 0);
        success && success.call(s)
      }
    }
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

define(function () {
  return ModuleController
});