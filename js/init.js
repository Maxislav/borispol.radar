var f = parseFloat;
var brr;

Number.prototype.degToRad = function(){
    var deg = this;
  //console.log(this);
    return Math.PI * deg/ 180

};
Date.prototype.toGmt = function(){
    var d = this;
    var offset = new Date().getTimezoneOffset();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+offset, d.getSeconds(), d.getMilliseconds());
};

/**
 * Секунды с начала дня
 * @returns {number}
 */
Date.prototype.secondsFromStartDay = function(){
    var d = this;
    var hh, mi, ss, ms;
    hh = d.getHours();
    mi = d.getMinutes();
    ss = d.getSeconds();
    return ss+(mi*60)+(hh*3600);
};

require.config({
	waitSeconds: 60,
	baseUrl: '',
    urlArgs: "bust=03.01.2016-13:41:58",
	paths: {
		jquery: 'lib/jquery/jquery-1.11.1.min',
		app: 'js/app',
		home: 'module/home/home',
		ired: 'module/ired/ired',
		ired24: 'module/ired24/ired24',
        meteosat: 'module/meteosat/meteosat',
		iredMet: 'module/iredMet/iredMet',
		text: 'lib/requirejs/text',
		timer: 'js/timer',
		visible: 'module/visible/visible',
		mouseevent: 'js/ParseDist',
		main: 'js/main',
		ir: 'js/ir',
		vi: 'js/vi',
		stat: 'module/stat/stat',
		info: 'module/info/info',
		build: 'build/scripts.min',
		eventsUKBB: 'module/home/eventsUKBB',
		helpme: 'module/helpme/helpme',
        DateFormat: 'lib/jquery/dateFormat',
        MathDate:'js/MathDate',
        moduleController: 'js/moduleController',
        informers: 'http://meteo.ua/var/informers',
        snow:'js/snow',
        rain: 'module/rain/rain',
        dopa: 'module/dopa/dopa',
        forecast: 'module/forecast/forecast',
		jqueryUi: 'lib/jquery/jquery-ui-1.11.1/jquery-ui.min',
        earth: 'module/earth/earth',
        threejs: 'lib/three/three.min',
        cloudsLoader: 'module/earth/clouds-loader'

	},
    shim:{
        info:{
            deps: [
                'informers'
            ]
        },
		jqueryUi:{
			deps:[
				'jquery'
			]
		},
        earth: {
			deps:[
				'threejs',
                'cloudsLoader'
			]
		}
       /* app:{
            deps: [
                'jquery'
            ]
        }*/

    }
});
require(
	[
		/*'jquery',
		'app',
		'timer',
		'main',
        'app',
        'DateFormat',
        'MathDate',
        'moduleController',
*/

        'build'
        //'home',
        //'snow',
       // 'threejs',


	], function ($) {
		app.init()

	});
