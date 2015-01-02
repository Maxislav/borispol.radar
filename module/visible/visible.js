var visible = {
    navTabs: 4,
    baseURI: 'http://www.sat24.com/image2.ashx?region=eu&time=',
    afterUrl: '&ir=false',
    offset: 5,
    steps: 9,
    arrimg: [],
    imgir: null,
    moduleName: 'visible',
    el: null,
    getDate: function(){
        var date = mathDate.setParams({mi: 15, ss: 60})(new Date(), {hh: -2, mi: -5})
        date = DateFormat.format.date(date, 'yyyyMMddHHmm')
        return date
    },
    getStepDate: function(offset){
        var date = mathDate.setParams({mi: 5, ss: 60})(new Date(), {hh: -2, mi: -2 - (offset += 5)})
        date = DateFormat.format.date(date, 'yyyyMMddHHmm')
        return date
    }
}
visible.__proto__ = ModuleController