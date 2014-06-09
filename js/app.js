var app = {
	css:{},
	init:function () {
		var s = this;
        var hash = window.location.hash.replace('#','');
        $(window).on('hashchange', function() {
            hash=   window.location.hash.replace('#','');
            s.loadmodulle(hash)
        });

		/*
		$('[module]').click(function (e) {
			var module = $(this).attr('module');
			s.loadmodulle(module)
		})
		s.loadmodulle('home');*/
        if( window.location.hash.replace('#','') == 'home'){
            s.loadmodulle ('home')
        }else{
            window.location.hash = 'home'
        }



      // var hash = window.location.hash.replace('#','');


	},
	loadmodulle: function(module){
		var s = this;
		require([
			module,
			'text' + '!' + module + '.html',
			'text' + '!' + module + '.css'
		], function (m, html, css) {


			if (!s.css[module]) {
				$('head').append('<style>'+css+'</style>')
				s.css[module]= true;
			}
			window[module].init(html)
		})
	} ,
	navTabs: function(n){
		$('.nav.nav-tabs').find('li').removeClass('active')
		$('.nav.nav-tabs').find('li').eq(n).addClass('active')
	},
	mask:{
		show:function (el) {
			var s = this;
			if(el){
				el.append('<div class="mask">' +
					'<svg width="60" height="60" class="svg">' +
					'<image xlink:href="img/loader.png" width="60" height="60">' +
					'<animateTransform attributeType="xml"' +
					'attributeName="transform" ' +
					'type="rotate"' +
					'from="0 30 30"' +
					'to="360 30 30"' +
					'dur="4s"' +
					'repeatCount="indefinite"/>' +
					'</image>' +
					'</svg>' +
					'</div>');

				el.find('.mask').height(el.height()).fadeTo(222, 1);
				el.find('.mask').css({
					position:'absolute'
				})
				el.find('.svg').css({
					position:'absolute',
					left:el.width() / 2 - 30 + 'px',
					top:el.height() / 2 - 30 + 'px'
				})
			}else{
				$('body').append('<div class="mask">' +
					'<svg width="60" height="60" class="svg">' +
					'<image xlink:href="img/loader.png" width="60" height="60">' +
					'<animateTransform attributeType="xml"' +
					'attributeName="transform" ' +
					'type="rotate"' +
					'from="0 30 30"' +
					'to="360 30 30"' +
					'dur="4s"' +
					'repeatCount="indefinite"/>' +
					'</image>' +

					'</svg>' +
					'</div>');


				$('.mask svg').click(function(){
					app.mask.hide()
				})

				$('.mask').height($(window).height()).fadeTo(222, 1);
				$('.svg').css({
					position:'absolute',
					left:$(window).width() / 2 - 30 + 'px',
					top:$(window).height() / 2 - 30 + 'px'
				})
			}


		},
		hide:function (el) {
			if(el){
				el.find('.mask').fadeTo(222, 0, function () {
					$(this).remove()
				})
			}else{
				$('.mask').fadeTo(222, 0, function () {
					$(this).remove()
				})
			}
		}
	}
}