"use strict";
define(['js/moduleController.js'], function (prototype) {

    var ired24 = {
        baseURI: 'img/sat/',
        afterUrl: '.gif',
        offset: 60,
        steps: 24,
        arrimg: [],
        errSrc: 'http://www.sat24.com/image2.ashx?region=eu&ir=true',
        imgir: null,
        moduleName: 'visible',
        navTabs: 1,
        el: null,
        gmt: new Date().getTimezoneOffset()/60,
        getDate: function(){

            var date = mathDate.setParams({mi: 60, ss: 60})(new Date(), {hh: this.gmt, mi: -5})
            date = DateFormat.format.date(date, 'yyyyMMddHHmm');
            return date
        },
        getStepDate: function(offset){
            var date = mathDate.setParams({mi: 60, ss: 60})(new Date(), {hh: this.gmt, mi: -2 - (offset-60)})
            date = DateFormat.format.date(date, 'yyyyMMddHHmm');
            return date
        }
    };
    Ir24.prototype = prototype;
    function Ir24() {
        for(var opt in ired24){
            this[opt] = ired24[opt]
        }
    }
    return new Ir24()
});
