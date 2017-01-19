define(function () {

    return {
        el: null,
        img1: null,
        img2: null,
        srcStart: 'http://www.sat24.com/image2.ashx?region=eu&time=',
        srsEnd: '&ir=false',
        dateStart: null,
        dateCurrent: null,
        count: 10,
        start: null,
        arrimg: [],
        state: home.irState,
        elpanel: null,
        init: function () {
            var s = this;
            if (!s.elpanel) {
                s.elpanel = $('.panel-drive.vi-panel');
                s.el = $('.container-small-image').eq(1);
            }
        },
        load: function (a, succes, loader) {
            var s = this;
            if (!s.elpanel) {
                s.init()
            }
            //s.elpanel.find('.glyphicon-play').addClass('active')

            s.state.loading = true;
            var duts = s.dgmt();
            //  var src = ''+duts.getFullYear() + s.pnull(duts.getMonth())+s.pnull(duts.getDate()) + s.pnull(duts.getHours())+s.pnull(duts.getMinutes())
            //  console.log(src);

            var src = []
            var c = s.count;
            var k = 0;

            for (var i = 0; i < c; i++) {
                src[i] = '' + s.srcStart + s.delta(i * 15).getFullYear() + s.pnull(s.delta(i * 15).getMonth() + 1) +
                  s.pnull(s.delta(i * 15).getDate()) + s.pnull(s.delta(i * 15).getHours()) + s.pnull(s.delta(i * 15).getMinutes()) +
                  s.srsEnd;
                console.log(src[i])
            }

            for (var i = 0; i < c; i++) {
                load(i)
            }

            function load(i) {

                // img[i] = new Image() ;
                //  s.arrimg[i] = new Image();
                //  s.arrimg[i].onload = finish;
                //  s.arrimg[i].src = src[i];

                a[i] = new Image();
                a[i].onload = finish;
                a[i].src = src[i];


            }

            function finish() {
                k++;
                loader &&  loader.css({
                    width: k*10 +'%'
                });
                if (k == c) {
                    if (succes) {
                        succes(a)
                    } else {

                    }

                    //  setImgs();

                }
            }

            function setImgs() {
                for (var i = 0; i < s.count; i++) {
                    $('.small-images.vi').append(s.arrimg[i]);
                }
            }

        },

        refresh: function () {
            var s = this;
            if (!s.el) {
                s.init();
            }
            s.arrimg = [];
            var k = 0;
            var count = s.el.find('.small-images.vi img').length;
            s.el.find('.small-images.vi img').fadeTo(100, 0, function () {

                $(this).remove();
                k++;
                if (k == count) {
                    home.imgvi_s = new Image();
                    home.imgvi_s.onload = show;
                    home.imgvi_s.src = 'http://www.sat24.com/image2.ashx?region=eu&ir=true&m=' + ((Math.random() * 1000).toFixed(0));
                }
            })
            function show() {
                s.el.find('.small-images.vi').append($(home.imgvi_s))

                s.el.find('.small-images.vi img').fadeTo(222, 1, function () {
                    app.mask.hide($('.small-images.vi'));
                    s.el.find('.glyphicon-refresh').removeClass('active')
                });

            }
        },
        play: function () {
            var s = this;
            if (!s.elpanel) {
                s.init()
            }
            if (!s.arrimg.length) {
                s.el.find('.progress-loader').fadeTo(222,1);
                s.load(s.arrimg, function (res) {
                    s.arrimg = res;
                    for (var i = 0; i < s.count; i++) {
                        $('.small-images.vi').append(s.arrimg[i]);
                    }
                    s.el.find('.progress-loader').fadeTo(222,0, function(){
                        s.play();
                    });

                }, s.el.find('.small-images.vi .progress-bar'))
                return;
            }
            var k = 0;
            $('.small-images.vi img').not('.small-images.vi img:eq(0)').fadeTo(500, 1, function () {
                k++;
                if (k == s.count) {
                    setTimeout(function () {
                        play(k - 1)
                    }, 1000)

                }
            })
            function play(k) {
                if (0 <= k) {
                    $(s.arrimg[k]).fadeTo(500, 0, function () {
                        if (0 <= k) {
                            setTimeout(function () {
                                s.state.n = k;
                                play(k - 1)
                            }, 50)
                        }
                    })
                } else {
                    s.elpanel.find('.glyphicon-play').removeClass('active');
                    s.state.play = false;
                }
            }
        },
        back: function (k) {
            var s = this;

            if (!s.elpanel) {
                s.init()
            }
            if (k) {
                show(k)
            } else if (s.state.n) {
                if (s.state.n < (s.count - 1)) {
                    s.state.n++;
                    $('.panel-drive.vi-panel').find('.glyphicon-step-backward').addClass('active')
                    show(s.state.n)
                } else {
                    show(9)
                }
            } else if (!s.arrimg.length) {
                s.el.find('.progress-loader').fadeTo(222,1);
                s.load(s.arrimg,function (res) {
                    s.arrimg = res;

                    for (var i = 0; i < s.arrimg.length; i++) {
                        $('.small-images.vi').append(s.arrimg[i]);
                    }
                    s.el.find('.progress-loader').fadeTo(222,0, function(){
                        s.back(1)
                    });

                },s.el.find('.small-images.vi .progress-bar'))
            } else {
                s.back(1)
            }
            function show(k) {

                $(s.arrimg[k]).fadeTo(222, 1, function () {
                    $('.panel-drive.vi-panel').find('.glyphicon-step-backward').removeClass('active');
                    s.state.n = k;
                })
            }
        },
        forward: function (k) {
            var s = this;
            if (k || k == 0) {
                show(k)
            } else if (s.state.n) {
                if (s.state.n < s.count) {
                    s.state.n--;
                    $('.panel-drive.vi-panel').find('.glyphicon-step-forward').addClass('active')
                    show(s.state.n)
                }
            } else if (!s.arrimg.length) {
                s.load(s.arrimg,function (res) {
                    s.arrimg = res;
                    for (var i = 0; i < s.arrimg.length; i++) {
                        $('.small-images.vi').append(s.arrimg[i]);
                    }
                    s.forward(0)
                })
            } else {
                s.forward(0)
            }

            function show(k) {
                $(s.arrimg[k + 1]).fadeTo(222, 0, function () {
                    $('.panel-drive.vi-panel').find('.glyphicon-step-forward').removeClass('active');
                    s.state.n = k;
                })
            }
        },

        pnull: function (val) {
            val = f(val);
            if (val < 10) {
                return '0' + val
            }
            return '' + val
        },
        dgmt: function () {
            var s = this;
            var d = new Date();
            var int15 = d.getMinutes()
            if (int15 < 15) {
                int15 = 0
            } else if (int15 < 30) {
                int15 = 15
            } else if (int15 < 45) {
                int15 = 30
            } else {
                int15 = 45
            }
            return  new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() - 2, int15);
        },
        delta: function (delta) {
            var s = this;
            var mm = s.dgmt().getMinutes() - delta;
            return  new Date(s.dgmt().getFullYear(), s.dgmt().getMonth(), s.dgmt().getDate(), s.dgmt().getHours(), mm);
        }

    }
});
