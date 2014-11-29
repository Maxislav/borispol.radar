var f = parseFloat;
var brr;
require.config({
	waitSeconds: 60,
	baseUrl: '',
    urlArgs: "bust=2014.11.29-22:15:47",
	paths: {
		jquery: 'lib/jquery/jquery-min',
		app: 'js/app',
		home: 'module/home/home',
		ired: 'module/ired/ired',
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
        pendulum:'js/pendulum'
	},
    shim:{
        info:{
            deps: [
                'informers'
            ]
        }
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
        'moduleController'*/
        //'home',
        'pendulum',
		'build'
	], function ($) {
		app.init()

	})
