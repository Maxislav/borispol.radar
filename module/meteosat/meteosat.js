
define(['js/moduleController.js'], function (prototype) {

    var meteosat = {
        navTabs: 4,
        baseURI: 'http://meteo.gov.ua/sputnik_map/Sputn-',
        afterUrl: '.jpg',
        offset: 1,
        steps: 23,
        arrimg: [],
        imgir: null,
        moduleName: 'meteosat',
        el: null,
        getDate: function(){
            return '24';
        },
        getStepDate: function(offset){
            var val = 24 - offset;
            return  (val<10) ?  '0'+val : ''+val
        }

    }
    MeteoSat.prototype = prototype;
    function MeteoSat() {
        for(var opt in meteosat){
            this[opt] = meteosat[opt]
        }
    }

    return new MeteoSat()
})
