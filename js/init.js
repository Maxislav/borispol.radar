var f = parseFloat;
var brr;
require.config({
	waitSeconds: 60,
	baseUrl: '',
    urlArgs: "bust=04.03.2015-15:16:08",
	paths: {
		jquery: 'lib/jquery/jquery-1.11.2.min',
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
        download: 'module/download/download',
        fineUploader:'lib/jquery/all.fine-uploader-5.1.3.min'
       // three: 'module/three/three',
        //threejs: 'lib/three/three.min'

	},
    shim:{
        info:{
            deps: [
                'informers'
            ]
        },
        fineUploader:{
            deps:[
                'jquery'
            ]
        },
        download:{
          deps:[
              'fineUploader'
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
        'snow',
       // 'threejs',
		'build'
	], function ($) {
		app.init()

	})
