var visible = {

    baseURI: 'http://borispol.hol.es/img/vis/',
    afterUrl: '.gif',
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


    /*navTabs: 4,
    baseURI: 'http://www.sat24.com/image2.ashx?region=eu&time=',
    afterUrl: '&ir=false',
    offset: 5,
    steps: 8,
    arrimg: [],
    imgir: null,
    moduleName: 'visible',
    el: null,
    getDate: function(){
        var timeZoneOffset = new Date().getTimezoneOffset()/60;
        var s= this;
        var date = mathDate.setParams({mi: 15, ss: 60})(new Date(), {hh: timeZoneOffset, mi: -5});
        date = DateFormat.format.date(date, 'yyyyMMddHHmm');
        return date
    },
    getStepDate: function(offset){
        offset+=5;
        var timeZoneOffset = new Date().getTimezoneOffset()/60;
        var date = mathDate.setParams({mi: 5, ss: 60})(new Date(), {hh: timeZoneOffset, mi: -2 - offset});
        date = DateFormat.format.date(date, 'yyyyMMddHHmm');
        return date
    }*/
};
visible.__proto__ = ModuleController;
//visible.prototype = Object.create(ModuleController);
//visible.prototype = ModuleController;


