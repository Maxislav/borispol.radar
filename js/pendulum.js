function gg(){
    var s = this

    var x = 0;
    this.el = null
    this.d = null
    var t = 0, t2=0;
    var v = 0;
    var a = 50;
    var _x = 0;
    var sx = 100;
    var y = 0;
    function init(d, success){
        console.log(s)
        s.d = d
        s.el = $(document.createElement('div')).attr('class', 'snow')
        $('body').append(s.el)
        success && success.call(s)
    }
    this.play = function(d){
        if(!s.el){
            init(d, s.play);
            return
        }
        sx = getRandomArbitary(-100, $(window).width()-100)
        y = getRandomArbitary(0, -($(window).height()))
        delta()
        deltaY()
    }

    function getRandomArbitary(min, max){
        return Math.random() * (max - min) + min;
    }
    function deltaY(){
        y+=1
        s.el.css('top', y)
        if($(window).height()+30<y){

            y = -30;


        }
        setTimeout(deltaY, 40)
    }

    function delta(){
        t +=0.040
        x = sx + a*Math.pow(t, 2)/2
        s.el.css('left', x)
        if(200+sx<x){
            v = a*t
            _x = x
            //console.log(v)
            setTimeout(deltaMinus, 40)
            return
        }
        setTimeout(delta, 40)
    }

    function deltaMinus(){
        t2 +=0.040
        x = _x + v*t2 - (a*(Math.pow(t2,2))/2)
        s.el.css('left', x)
        if(x<200+sx){
            v = a*t2/2;
            //console.log(v)
            t2 =0
            setTimeout(deltaPlus, 40)
            return
        }
        setTimeout(deltaMinus, 40)
    }

    function deltaPlus(){
        t2 +=0.040
        x = _x - v*t2 + (a*(Math.pow(t2,2))/2)
        s.el.css('left', x)
        if(x<=2+sx){
            t = 0
            _x=0
            t2 = 0
            setTimeout(delta, 40);
            return
        }
        setTimeout(deltaPlus, 40)

    }



    return this
}

   /* s.playrr = function (d) {
        this.el = null
        this.d = d;
        this.__proto__ = s
        function init(success) {

            success && success.call(s)
        }

        function play () {

            if (!s.el) {
                console.log(s)
                init(s.ok)
                return
            }

        }
        s.ok = function(){
            console.log('d')
        }

      play()

    }*/
