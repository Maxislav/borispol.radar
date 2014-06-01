var visible = {
    el: null,
    elpanel: null,
    arrimg: [],
    state: {},
    init: function (html) {
        var s = this;
        if (!s.el) {

            $('.content').append(html)
            s.el = $('.content .visible');
            s.el.fadeTo(222, 1);
            visible.__proto__ = home;
            s.show()
            s.showImg();

            s.elpanel = s.el.find('.panel-drive');
            s.elpanel.on('click', '.glyphicon-play', function () {
                s.play();
            }).on('click', '.glyphicon-refresh', function(){

            })

        } else {
            s.show()
        }
        app.navTabs(2);
    },
    showImg: function () {
        var s = this;
        app.mask.show(s.el.find('.container-imgs-vi'));
        var imgvi = new Image();
        imgvi.onload = function () {
            app.mask.hide(s.el.find('.container-imgs-vi'))
            s.el.find('img').attr('src',
                home.imgvi_s
            ).fadeTo(222, 1)
        }
        imgvi.src = home.imgvi_s;
    },
    play: function () {

        var s = this;
        if(s.state.play){
            return;
        }

        s.state.play = true;
        s.elpanel.find('.glyphicon-play').addClass('active')
        var k = 0
        if(s.arrimg.length){
            hide(function(){
                play(k-1)
            })
        }else{
            s.load(function(){
                for (var i = 0; i<vi.count; i++){
                    s.el.find('.container-imgs-vi').append(s.arrimg[i])
                }
                hide(function(){
                    play(k-1);
                })

            })
        }
        function hide(success){

            s.el.find('img').not('img:eq(0)').fadeTo(500, 1, function () {
                k++;
                if (k == s.arrimg.length) {
                    setTimeout(function () {
                        success();
                        //play(k - 1)
                    }, 500)

                }
            })
        }
        function play(k) {
            if (0 <= k) {
                $(s.arrimg[k]).fadeTo(500, 0, function () {
                    if (0 <= k) {
                        s.state.n = k;
                        setTimeout(function () {
                            play(k - 1)
                        }, 50)
                    }
                })
            } else {
                s.elpanel.find('.glyphicon-play').removeClass('active');
                s.state.play = null;
            }
        }


    },
    load: function(success){
        var s = this;
        require(['vi'],function(){
            var loader = s.el.find('.progress-bar');
            s.el.find('.progress-loader').fadeTo(222,1);
            vi.load(s.arrimg, function(res){
                s.arrimg = res;
                s.el.find('.progress-loader').fadeTo(222,0, function(){
                    if(success){
                        success();
                    }
                })

            },loader)
        })
    },
    refresh: function(){

    }
}
