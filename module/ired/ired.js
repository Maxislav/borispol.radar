var ired = {
	el: null,
	elpanel: null,
	arrimg: [],
	state: {},
    stepBask: 8,
    baseURI: 'http://www.sat24.com/image2.ashx?region=eu&time=',
    afterUrl : '&ir=true',
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
                imgir.src
			).fadeTo(222, 1)
		}

        var date = mathDate.setParams({mi:15, ss: 60})(new Date(),{hh:-2, mi:-5})
        date = DateFormat.format.date(date, 'yyyyMMddHHmm')
       // console.log(date)
		imgir.src = s.baseURI + date+ s.afterUrl
        console.log(imgir.src)
	},
    load: function(success){
        var s = this;
        var arr = s.arrimg;
        var steps = s.stepBask;
        var k = 0;
        var offset = 0
        for (var i = 0; i<steps; i++){
            var date = mathDate.setParams({mi:15, ss: 60})(new Date(),{hh:-2, mi:-5-(offset+=15)})
            date = DateFormat.format.date(date, 'yyyyMMddHHmm')


            arr[i] = new Image();
            arr[i].onload = ok
            arr[i].src = s.baseURI + date+ s.afterUrl
        }

        function ok(){
            k++
            if(k==steps){

                for (var i = 0; i<steps; i++){
                    s.arrimg[steps-i] = arr[i]
               //  console.log(arr[i].src)
                   // s.arrimg[steps-i] = arr[i]
                }
                for (var i = 0; i<steps; i++){
                   // s.arrimg[steps-i] = arr[i]
                     console.log(s.arrimg[i].src)
                    // s.arrimg[steps-i] = arr[i]
                }

                success && success.call(s)
            }
        }

    },



	play: function () {

		var s = this;
        if(!s.arrimg.length){

            s.load(s.play)
            return
        }
        console.log('ok')

        return
        //container-imgs-ir

       // s.el.fi





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
	/*load: function(success){
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
	},*/
	refresh: function(){

	}
}
