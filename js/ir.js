define(function(){

    return {
        el: null,
        img1: null,
        img2: null,
        srcStart: 'http://www.sat24.com/image2.ashx?region=eu&time=',
        srsEnd: '&ir=true',
        dateStart: null,
        dateCurrent: null,
        count: 10,
        start: null,
        arrimg: [],
        state: null,//home.irState,
        elpanel: null,
        init: function () {
            var s = this;
            if (!s.elpanel) {
                s.elpanel = $('.panel-drive.ir-panel');
                s.el = $('.container-small-image').eq(0);
            }
        },
        setState: function (val) {
          this.state = val  
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
                    $('.small-images.ir').append(s.arrimg[i]);
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
            var count = s.el.find('.small-images.ir img').length;
            s.el.find('.small-images.ir img').fadeTo(100, 0, function () {

                $(this).remove();
                k++;
                if (k == count) {
                    home.imgir_s = new Image();
                    home.imgir_s.onload = show;
                    home.imgir_s.src = 'http://www.sat24.com/image2.ashx?region=eu&ir=true&m=' + ((Math.random() * 1000).toFixed(0));
                }
            })
            function show() {
                s.el.find('.small-images.ir').append($(home.imgir_s))

                s.el.find('.small-images.ir img').fadeTo(222, 1, function () {
                    app.mask.hide($('.small-images.ir'));
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
                        $('.small-images.ir').append(s.arrimg[i]);
                    }
                    s.el.find('.progress-loader').fadeTo(222,0, function(){
                        s.play();
                    });

                }, s.el.find('.small-images.ir .progress-bar'))
                return;
            }
            var k = 0;
            $('.small-images.ir img').not('.small-images.ir img:eq(0)').fadeTo(500, 1, function () {
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
                    $('.panel-drive.ir-panel').find('.glyphicon-step-backward').addClass('active')
                    show(s.state.n)
                } else {
                    show(9)
                }
            } else if (!s.arrimg.length) {
                s.el.find('.progress-loader').fadeTo(222,1);
                s.load(s.arrimg,function (res) {
                    s.arrimg = res;

                    for (var i = 0; i < s.arrimg.length; i++) {
                        $('.small-images.ir').append(s.arrimg[i]);
                    }
                    s.el.find('.progress-loader').fadeTo(222,0, function(){
                        s.back(1)
                    });

                },s.el.find('.small-images.ir .progress-bar'))
            } else {
                s.back(1)
            }
            function show(k) {

                $(s.arrimg[k]).fadeTo(222, 1, function () {
                    $('.panel-drive.ir-panel').find('.glyphicon-step-backward').removeClass('active');
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
                    $('.panel-drive.ir-panel').find('.glyphicon-step-forward').addClass('active')
                    show(s.state.n)
                }
            } else if (!s.arrimg.length) {
                s.load(s.arrimg,function (res) {
                    s.arrimg = res;
                    for (var i = 0; i < s.arrimg.length; i++) {
                        $('.small-images.ir').append(s.arrimg[i]);
                    }
                    s.forward(0)
                })
            } else {
                s.forward(0)
            }

            function show(k) {
                $(s.arrimg[k + 1]).fadeTo(222, 0, function () {
                    $('.panel-drive.ir-panel').find('.glyphicon-step-forward').removeClass('active');
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
        },
        bigimg: {
            el: null,
            container: null,
            html: null,
            show: function () {
                var s = this;
                s.__proto__ = ir;
                if (!s.el) {

                    $.get('/items/bigimg.html', function (html) {
                        s.html = html;
                        visible(s.html)
                    })

                } else {
                    visible(s.html)
                }

                function visible(html) {
                    $('#body').append(html);
                    s.el = $('.bigimg');
                    s.container = s.el.find('.images');
                    var toppp = (($(window).height()) - (s.el.find('.images')).height()) / 2;

                    s.el.find('.images').css({
                        top: (0 < toppp) && toppp + 'px'
                    })
                    s.el.fadeTo(222, 1);
                    s.container.find('img').eq(0)[0].src = 'http://www.sat24.com/image2.ashx?region=eu&ir=true'
                    s.container.click(function (e) {
                        if (e.target == $('.close')[0]) {
                            e.stopPropagation();
                            s.hide()
                        } else {
                            s.load(s.container.find('img').eq(0), s.container.find('img').eq(1))
                        }
                    })
                }
            },


            hide: function () {
                var s = this;
                s.el.fadeTo(222, 0, function () {
                    s.el.remove();

                })

            }
        },
        blink: {
            el: null,
            show: function (el) {
                el[0].blink = true

                motor()
                function motor() {
                    el.fadeTo(400, 1, function () {
                        if (el[0].blink) {
                            el.fadeTo(400, 0, function () {
                                el[0].blink && motor()
                            })
                        } else {
                            el.css({
                                opacity: 0
                            })
                        }
                    })
                }
            },
            hide: function (el) {
                el[0] && delete el[0].blink
            }

        }



    }

})
