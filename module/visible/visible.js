"use strict";
define(['js/moduleController.js'], function (prototype) {

    var _visible = {

        baseURI: 'img/vis/',
        afterUrl: '.gif',
        errSrc: 'http://www.sat24.com/image2.ashx?region=eu&ir=false',
        offset: 60,
        steps: 24,
        arrimg: [],
        imgir: null,
        moduleName: 'visible',
        navTabs: 3,
        el: null,
        gmt: new Date().getTimezoneOffset()/60,
        getDate: function(){

            var date = mathDate.setParams({mi: 60, ss: 60})(new Date(), {hh: this.gmt, mi: -5})
            date = DateFormat.format.date(date, 'yyyyMMddHHmm')
            return date
        },
        getStepDate: function(offset){
            var date = mathDate.setParams({mi: 60, ss: 60})(new Date(), {hh: this.gmt, mi: -2 - (offset-60)})
            date = DateFormat.format.date(date, 'yyyyMMddHHmm')
            return date
        }
    };

    Visible.prototype = prototype;
    function Visible() {
        for(var opt in _visible){
            this[opt] = _visible[opt]
        }
    }
    return new Visible()
});


