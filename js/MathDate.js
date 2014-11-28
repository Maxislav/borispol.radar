var mathDate = {};
(function (m) {
    var step = {};
    m.summ = function(_date, _obj, _step){
        _obj = _obj || {}
        var yyyy, mm, dd, hh,mi,ss;
        var p = ['yyyy', 'mm', 'dd', 'hh','mi','ss']
        var j = {};
        var st = _step || step;
        for(var i = 0; i< p.length; i++){
            j[p[i]] = _obj[p[i]] || 0;
            st[p[i]] = st[p[i]] ? st[p[i]] :1 ;
        }
        var d = _date || new Date();
        yyyy = d.getFullYear()
        mm = d.getMonth()
        dd = d.getDate();
        hh = d.getHours();
        mi = d.getMinutes();
        ss = d.getSeconds();
        d = new Date(yyyy+j['yyyy'], mm + j['mm'], dd+j['dd'], hh+j['hh'], mi+ j['mi'], ss+j['ss']);
        yyyy = Math.floor(d.getFullYear()/st['yyyy']) * st['yyyy']
        mm = Math.floor(d.getMonth()/st['mm']) * st['mm']
        dd = Math.floor(d.getDate()/st['dd']) * st['dd']
        hh = Math.floor(d.getHours()/st['hh']) * st['hh']
        mi = Math.floor(d.getMinutes()/st['mi']) * st['mi']
        ss = Math.floor(d.getSeconds()/st['ss']) * st['ss']
        return new Date(yyyy, mm, dd, hh, mi, ss)
    }
    m.setParams = function(_step){
        step = _step || {}
        return this.summ
    }
})(mathDate)
