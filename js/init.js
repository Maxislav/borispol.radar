var f = parseFloat;
require.config({
	waitSeconds: 60,
	baseUrl: '',
	paths: {
		jquery: 'lib/jquery/jquery-min',
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
		build: 'build/scripts.min'
	}
});
require(
	[
		/*'jquery',
		'app',
		'timer',
		'main'*/
		'build'
	], function ($) {
		app.init()
	})
