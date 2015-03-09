var visible={
	el: null,
	init: function(html){
		var s = this;
		if  (!s.el){
			$('.content').children('div').css({
				//visibility: 'hidden',
				//position: 'inherit'
			});
			$('.content').children('div').fadeTo(222,0,function(){
				$(this).css({
					visibility: 'hidden'
				})
			})


			$('.content').append(html)
			s.el  = $('.content .visible');
			s.el.fadeTo(222,1);
			visible.__proto__ = home;
			s.showImg();

		} else{
			s.show()
		}
		app.navTabs(2);
	},
	showImg: function(){
		var s = this;
		app.mask.show(s.el.find('.container-imgs-vi'));
		var imgvi = new Image();
		imgvi.onload = function(){
			app.mask.hide(s.el.find('.container-imgs-vi'))
			s.el.find('img').attr('src',
				home.imgvi_s
			).fadeTo(222,1)
		}
		imgvi.src = home.imgvi_s;

	}

}