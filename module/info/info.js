"use strict";
define(['js/moduleController.js'],  (prototype)=> {
	var info = {
		el: null,
		elpanel: null,
		arrimg: [],
		state: {},
		navTabs: 5,
		showImg: ()=>{}
	};
	Info.prototype = prototype;
	function Info() {
		for(var opt in info){
			this[opt] = info[opt]
		}
	}
	return new Info()
});
