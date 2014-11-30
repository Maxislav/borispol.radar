var rain = {
    navTabs: 2,
    baseURI: 'http://www.sat24.com/image2.ashx?region=eu&time=',
    baseURIRain: 'http://www.sat24.com/image2.ashx?type=co&f=eu&time=',
    arrRain: [],
    showImg: function () { //@overide
        var s = this;
        var k = 0
        var conteiner = s.container = s.el.find('.container-imgs-ir');
        var mask = app.mask.show(conteiner);
        var imgir = new Image();
        var imgRain = new Image();

        s.img = $(document.createElement('div')).css({
            opacity:0
        });
        $(imgir).css({
            opacity:1
        })
        $(imgRain).css({
            opacity:1
        })
        imgir.onload = function () {
            complate()
        }
        imgRain.onload = function () {
            complate()
        }
        function complate(){
            k++
            if(k==2){
                s.img.append(imgir)
                s.img.append(imgRain)
                conteiner.append(s.img)
                s.img.fadeTo(500, 1, function () {
                    app.mask.remove(mask)
                })
            }
        }

        var date = s.getDate()
        imgir.src = s.baseURI + date + s.afterUrl
        imgRain.src = s.baseURIRain + date
        console.log(imgir.src)
    },
    load: function (success) {
        var s = this;
        var arr = s.arrimg;
        var arrRain = s.arrRain;
        var steps = s.steps;
        var k = 0;
        var offset = 0;
        s.progressLoader.fadeTo(222, 1)
        for (var i = 0; i < steps; i++) {
            offset += s.offset
            var date = s.getStepDate(offset)
            arr[i] = new Image();
            arrRain[i] = new  Image();
            arr[i].onload = ok;
            arrRain[i].onload = ok;
            arr[i].src = s.baseURI + date + s.afterUrl
            arrRain[i].src = s.baseURIRain+date
        }

        function ok() {
            k++
            s.progressBar.css({
                width: Math.ceil(k * 100 / (2*steps)) + '%'
            })
            if (k == steps*2) {
                var _arr = []
                for (var i = 0; i < steps; i++) {
                    var el = $(document.createElement('div')).css({
                        opacity: 0
                    })
                    el.append(arr[i])
                    el.append(arrRain[i])
                    $(arr[i]).css({
                        opacity: 1
                    })
                    $(arrRain[i]).css({
                        opacity: 1
                    })
                    _arr.push(el)
                }
                for (var i = 0; i < steps; i++) {
                    s.arrimg[steps - i - 1] = _arr[i]
                }
                s.img.remove()
                for (var i = 0; i < steps; i++) {
                    //console.log(s.arrimg[i].src)
                    s.container.append(s.arrimg[i])
                    $(s.arrimg[i]).css({'opacity': 1})
                }
                s.clip = steps - 1;
                s.progressLoader.fadeTo(222, 0)
                success && success.call(s)
            }
        }
    }
}
rain.__proto__ = ModuleController