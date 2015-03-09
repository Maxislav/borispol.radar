var ired24 = {
    baseURI: 'http://borispol.hol.es/img/sat/',
    afterUrl: '.gif',
    offset: 60,
    steps: 24,
    arrimg: [],
    imgir: null,
    moduleName: 'visible',
    navTabs: 2,
    el: null,
    getDate: function(){
        var date = mathDate.setParams({mi: 60, ss: 60})(new Date(), {hh: -2, mi: -5})
        date = DateFormat.format.date(date, 'yyyyMMddHHmm')
        return date
    },
    getStepDate: function(offset){
        var date = mathDate.setParams({mi: 60, ss: 60})(new Date(), {hh: -2, mi: -2 - (offset-60)})
        date = DateFormat.format.date(date, 'yyyyMMddHHmm')
        return date
    }
}
ired24.__proto__ = ModuleController
