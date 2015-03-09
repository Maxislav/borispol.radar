var stat = {
	el: null,
	inited: function(html){
		var s = this;
		 if(!s.el){
			 $('.content').append(html)
			 s.el  = $('.content .stat');
			 stat.__proto__ = home;
		 }
	},

	init: function(html){
		var s = this;
		if  (!s.el){
			$('.content').children('div').css({
				//visibility: 'hidden',
				position: 'inherit'
			});
			$('.content').children('div').fadeTo(222,0,function(){
				$(this).css({
					visibility: 'hidden'
				})
			})


			$('.content').append(html)
			s.el  = $('.content .stat');
			s.el.fadeTo(222,1);
			stat.__proto__ = home;
			//s.showImg();

		} else{
			s.show()
		}
		app.navTabs(5);
	}


}
