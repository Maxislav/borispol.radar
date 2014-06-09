var f = parseFloat;
var home;
require.config({
	waitSeconds: 60,
	baseUrl: '',
	paths: {
		jquery: 'lib/jquery/jquery-min',
        dateFormat: 'lib/jquery/dateFormat',
		app: 'js/app',
		home: 'module/home/home',
		ired: 'module/ired/ired',
		text: 'lib/requirejs/text',
		timer: 'js/timer',
		visible: 'module/visible/visible',
		mouseevent: 'js/ParseDist',
		main: 'js/main',
		ir: 'js/ir',
		vi: 'js/vi',
		stat: 'module/stat/stat',
		info: 'module/info/info',
        eventsUKBB: 'module/home/eventsUKBB',
        iredMet: 'module/iredMet/iredMet',
        helpme : 'module/helpme/helpme'
	}
});
require(
	[
		'jquery',
		'app',
		'timer',
		'main'
	], function ($) {
		app.init()
	})
