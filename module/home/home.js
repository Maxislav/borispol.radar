home = {
    el: null,
    imgir_s: null,
    imgvi_s: null,
    irState: {},
    viState: {},
    init: function (html) {
        var s = this;
        if (!s.el) {
            $('.content').append(html);
            s.el = $('.content .home');
            s.el.fadeTo(222, 1);
            timer.init();
            s.showImg();
            s.events();
            require([
                'mouseevent'
            ], function () {
                mousEvent();
            })
            var irpanel = $('.ir-panel');

            irpanel.on('click', '.glyphicon-play',
                function () {
                    if (!s.irState.play) {
                        s.irState.plat = true;
                        $(this).addClass('active');
                        require(['ir'], function (r) {
                            ir.play();
                        })
                    }
                }).on('click', '.glyphicon-step-backward',
                function () {
                    $(this).addClass('active')
                    s.irState.back = true;
                    require(['ir'], function (r) {
                        ir.back();
                    })
                }).on('click', '.glyphicon-step-forward',function () {
                    $(this).addClass('active')
                    s.irState.forward = true;
                    require(['ir'], function (r) {
                        ir.forward();
                    })
                }).on('click', '.glyphicon-refresh', function () {

                    $(this).addClass('active');
                    app.mask.show($('.small-images.ir'))
                    require(['ir'], function () {
                        ir.refresh();
                    })
                })

            var vipanel = $('.vi-panel');

            vipanel.on('click', '.glyphicon-play',
                function () {
                    if (!s.irState.play) {
                        s.viState.plat = true;
                        $(this).addClass('active');
                        require(['vi'], function (r) {
                            vi.play();
                        })
                    }
                }).on('click', '.glyphicon-step-backward',
                function () {
                    $(this).addClass('active')
                    s.viState.back = true;
                    require(['vi'], function (r) {
                        vi.back();
                    })
                }).on('click', '.glyphicon-step-forward',function () {
                    $(this).addClass('active')
                    s.viState.forward = true;
                    require(['vi'], function (r) {
                        vi.forward();
                    })
                }).on('click', '.glyphicon-refresh', function () {

                    $(this).addClass('active');
                    app.mask.show($('.small-images.vi'))
                    require(['vi'], function () {
                        vi.refresh();
                    })
                })

        } else {
            s.show()
        }
        app.navTabs(0);
    },
    show: function () {
        var s = this;
        $('.content').children('div').not(s.el).css({
            //position:'inherit',
            left: 0 + 'px',
            top: 0 + 'px'
        })
        $('.content').children('div').not(s.el).fadeTo(222, 0, function () {
            $(this).css({
                visibility: 'hidden'
            })
        })

        s.el.css({
            //position:'inherit',
            visibility: 'visible'
        })
        s.el.fadeTo(222, 1)
    },
    showImg: function () {
        var s = this;
        app.mask.show($(s.el.find('.ukbb-content .imgs')));
        app.mask.show(s.el.find('.small-images.ir'));
        app.mask.show(s.el.find('.small-images.vi'));

        var imgukbb = new Image();
        var imgir = new Image();
        var imgvi = new Image();
        imgukbb.s = 'http://meteoinfo.by/radar/UKBB/UKBB_latest.png?v=' + ((Math.random() * 1000).toFixed(0));

        var imgir_s = 'http://www.sat24.com/image2.ashx?region=eu&ir=true&m=' + ((Math.random() * 1000).toFixed(0));
        s.imgir_s = imgir_s;

        var imgvi_s = 'http://sat24.com/image2.ashx?region=eu&ir=false&m=' + ((Math.random() * 1000).toFixed(0))
        s.imgvi_s = imgvi_s;

        onload(imgukbb, s.el.find('.ukbb-content'), imgukbb.s);
        onload(imgir, s.el.find('.small-images.ir'), imgir_s)
        onload(imgvi, s.el.find('.small-images.vi'), imgvi_s)

        imgukbb.src = imgukbb.s;
        imgir.src = imgir_s;
        imgvi.src = imgvi_s;
        function onload(img, el, src) {
            img.onload = function () {
                app.mask.hide(el);
                if (src) {
                    el.find('img').attr(
                        'src',
                        src
                    )
                }
                el.find('img').fadeTo(222, 1)
            }
        }
    },
    events: function(){
        var s = this;
        require([
        'eventsUKBB'
        ], function(js){
            new js(s.el)
        })

    }

}