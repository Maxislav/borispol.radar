var f = parseFloat;
var brr;
require.config({
	waitSeconds: 60,
	baseUrl: '',
    urlArgs: "bust=18.10.2015-01:12:28",
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
		jqueryUi: 'lib/jquery/jquery-ui-1.11.1/jquery-ui.min'
       // three: 'module/three/three',
        //threejs: 'lib/three/three.min'

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
