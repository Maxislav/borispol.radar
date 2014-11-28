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
    baseURI: 'http://www.sat24.com/image2.ashx?region=eu&time=',
    active: false,
    afterUrl: '&ir=true',
    clip: null,
    container: null,
    imgir: null,
    progressLoader: null,
    progressBar:null,
    navTabs: 1,
    init: function (html) {
        var s = this;
        if (!s.el) {
            if (!home) {
                require([
                    'home'
                ], function () {
                    goNext()
                })
            } else {
                goNext();
            }
            function goNext() {
                $('.content').append(html)
                s.el = $('.content .ired');
                s.el.fadeTo(222, 1);
                s.btnPlay = s.el.find('.glyphicon.glyphicon-play');
                s.btnRefresh = s.el.find('.glyphicon.glyphicon-refresh');
                s.btnStepBask = s.el.find('.glyphicon.glyphicon-step-backward');
                s.btnStepForward = s.el.find('.glyphicon.glyphicon-step-forward');
                s.progressLoader = s.el.find('.progress-loader');
                s.progressBar  = s.el.find('.progress-bar');
                ired.__proto__ = home;
                s.show()
                s.showImg();
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
                    .on('click','.glyphicon.glyphicon-step-backward' , function(){
                        if(s.btnStepBask.active) return
                        s.btnStepBask.addClass('active')
                        s.btnStepBask.active = true
                        s.stepBack()
                    })
                    .on('click','.glyphicon.glyphicon-step-forward' , function(){
                        if(s.btnStepForward.active) return
                        s.btnStepForward.addClass('active')
                        s.btnStepForward.active = true
                        s.stepForward()
                    })
            }
        } else {
            s.show()
        }
        app.navTabs(s.navTabs);
    },
    showImg: function () {
        var s = this;
        var conteiner = s.container = s.el.find('.container-imgs-ir');
        var mask = app.mask.show(conteiner);
        var imgir = new Image();
        s.imgir = imgir;
        imgir.onload = function () {
            conteiner.append(imgir)
            $(imgir).fadeTo(500, 1, function () {
                app.mask.remove(mask)
            })
        }
        var date = s.getDate()
        imgir.src = s.baseURI + date + s.afterUrl
        console.log(imgir.src)
    },

    load: function (success) {
        var s = this;
        var arr = s.arrimg;
        var steps = s.steps;
        var k = 0;
        var offset = 0;
        s.progressLoader.fadeTo(222,1)
        for (var i = 0; i < steps; i++) {
            var date = mathDate.setParams({mi: 15, ss: 60})(new Date(), {hh: -2, mi: -2 - (offset += 15)})
            date = DateFormat.format.date(date, 'yyyyMMddHHmm')

            console.log(date)
            arr[i] = new Image();
            arr[i].onload = ok
            arr[i].src = s.baseURI + date + s.afterUrl
        }

        function ok() {
            k++
            s.progressBar.css({
                width: Math.ceil(k*100/steps)+'%'
            })
            if (k == steps) {
                var _arr = []

                for (var i = 0; i < steps; i++) {
                    _arr.push(arr[i])
                }
                for (var i = 0; i < steps; i++) {

                    s.arrimg[steps - i - 1] = _arr[i]
                }
                $(s.imgir).remove()

                for (var i = 0; i < steps; i++) {
                    console.log(s.arrimg[i].src)
                    s.container.append(s.arrimg[i])
                    $(s.arrimg[i]).css({'opacity': 1})
                }
                s.clip = steps-1;
                s.progressLoader.fadeTo(222,0)
                success && success.call(s)
            }
        }
    },
    play: function () {
        var s = this;
        s.btnPlay.addClass('active')
        if (!s.arrimg.length) {
            s.load(s.play)
            return
        }

        var steps = s.steps;
        var arrimg = s.arrimg;
        var k = 0;
        for (var i = 1; i < steps; i++) {
            $(arrimg[i]).fadeTo(400, 0, start)
        }
        function start() {
            k++
            if (k == steps - 1) {
                k = 1
                setTimeout(play, 500)
            }
        }

        function play() {
            $(arrimg[k]).fadeTo(200, 0.2, function () {
                s.clip = k;
                toFade(k)
                if (k < steps) {
                    k++
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
            s.arrimg = []
            s.imgir = null
            s.showImg();
        }, 300)
    },
    stepBack: function(){
        var s = this;
        if(!s.arrimg.length){
            s.load(s.stepBack)
            return
        }
        if(s.clip && 0<s.clip){
            $(s.arrimg[s.clip]).fadeTo(222,0, function(){
                s.clip--
                s.btnStepBask.active = false
                s.btnStepBask.removeClass('active')
            })
        }else{
            s.btnStepBask.active = false
            s.btnStepBask.removeClass('active')
        }
    },
    stepForward: function(){
        var s = this;
        if(!s.arrimg.length){
            s.load(s.stepForward)
            return
        }
        if(s.clip<s.steps-1){
            s.clip++
            $(s.arrimg[s.clip]).fadeTo(222,1, function(){

                s.btnStepForward.active = false
                s.btnStepForward.removeClass('active')
            })
        }else{
            s.btnStepForward.active = false
            s.btnStepForward.removeClass('active')
        }
    },
    getDate: function(){
        var date = mathDate.setParams({mi: 15, ss: 60})(new Date(), {hh: -2, mi: -5})
        date = DateFormat.format.date(date, 'yyyyMMddHHmm')
        return date
    },
}
