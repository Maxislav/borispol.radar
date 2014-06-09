var ired = {
	el: null,
	elpanel: null,
	arrimg: [],
	state: {},
	init: function (html) {
		var s = this;
		if (!s.el) {
            if(!home){
                require([
                'home'
                ], function(){
                    goNext()
                })
            }else{
                goNext();
            }

            function goNext(){
                $('.content').append(html)
                s.el = $('.content .ired');
                s.el.fadeTo(222, 1);
                ired.__proto__ = home;
                s.show()
                s.showImg();

                s.elpanel = s.el.find('.panel-drive');
                s.elpanel.on('click', '.glyphicon-play', function () {
                    s.play();
                }).on('click', '.glyphicon-refresh', function(){

                })
            }


		} else {
			s.show()
		}
		app.navTabs(1);
	},
	showImg: function () {
		var s = this;
		app.mask.show(s.el.find('.container-imgs-ir'));
		var imgir = new Image();
		imgir.onload = function () {
			app.mask.hide(s.el.find('.container-imgs-ir'))
			s.el.find('img').attr('src',
				home.imgir_s
			).fadeTo(222, 1)
		}
		imgir.src = home.imgir_s;
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
				for (var i = 0; i<ir.count; i++){
					s.el.find('.container-imgs-ir').append(s.arrimg[i])
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
		require(['ir'],function(){
            var loader = s.el.find('.progress-bar');
            s.el.find('.progress-loader').fadeTo(222,1);
			ir.load(s.arrimg, function(res){
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
