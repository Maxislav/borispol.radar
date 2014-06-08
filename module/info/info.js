var info = {
	el: null,
	elpanel: null,
	arrimg: [],
	state: {},
	init: function (html) {
		var s = this;
		if (!s.el) {

            require([
            'http://meteo.ua/var/informers.js'
            ], function(){
                $('.content').append(html)
                s.el = $('.content .info');
                s.el.fadeTo(222, 1);
                info.__proto__ = home;
                s.show()
            })



		} else {
			s.show()
		}
		app.navTabs(3);
	}
}