var snow = function(n){
    function sn(){
        var s = this
        var x = 0;
        this.el = null
        this.d = null
        var t = 0, t2=0;
        var v = 0;
        var a = 50;
        var _x = 0;
        var sx = 100;
        var speedy = 1;
        var y = 0;
        var timeout = 0;
        this.animate = false;
        function init(d, success){
            s.d = d
            s.el = $(document.createElement('div')).attr('class', 'snow').css({
                opacity:0
            })
            $('body').append(s.el)
            sx = getRandomArbitary(0, $(window).width()-420)
            y = getRandomArbitary(0, -($(window).height()))
            timeout = getRandomArbitary(0, 10000)
            var n = getRandomArbitary(0.5,3)
            speedy = getRandomArbitary(20,40)
            n = Math.round(n)
            s.el.addClass('s'+n)
            s.animate = true;
            evetns()
            success && success.call(s)
        }

        function evetns(){
            s.el.click(function(){
                s.animate = false
                close()
            })
        }
        function close(){
            var elBoom = $(document.createElement('div')).attr('class', 'boom')
            s.el.append(elBoom)
            elBoom.fadeTo(100, 1, function(){
                s.el.fadeTo(400,0, function(){
                    s.el.remove ()
                    s.el = null
                    s.play()
                })
            })
        }

        this.play = function(d){
            if(!s.el){
                init(d, s.play);
                return
            }

            setTimeout(function(){
                s.el.fadeTo(1000,1)
                delta()
                deltaY()
            },timeout)

        }

        function getRandomArbitary(min, max){
            return Math.random() * (max - min) + min;
        }
        function deltaY(){
            if(!s.animate) return;
            y+=1;
            s.el.css('top', y)
            if($(window).height()-50<y){
                s.el.fadeTo(222,0, function(){
                    y = -30
                    s.el.fadeTo(222,1)
                })
            }else{

            }

            setTimeout(deltaY, speedy)
        }

        function delta(){
            if(!s.animate) return;
            t +=0.040
            x = sx + a*Math.pow(t, 2)/2
            s.el.css('left', x)
            if(200+sx<x){
                v = a*t
                _x = x
                setTimeout(deltaMinus, 40)
                return
            }
            setTimeout(delta, 40)
        }

        function deltaMinus(){
            if(!s.animate) return;
            t2 +=0.040
            x = _x + v*t2 - (a*(Math.pow(t2,2))/2)
            s.el.css('left', x)
            if(x<200+sx){
                v = a*t2/2;
                t2 =0
                setTimeout(deltaPlus, 40)
                return
            }
            setTimeout(deltaMinus, 40)
        }
        function deltaPlus(){
            if(!s.animate) return;
            t2 +=0.040
            x = _x - v*t2 + (a*(Math.pow(t2,2))/2)
            s.el.css('left', x)
            if(x<=2+sx){
                t = 0;
                _x=0;
                t2 = 0;
                setTimeout(delta, 40);
                return
            }
            setTimeout(deltaPlus, 40)
        }
    }
    for(var i=0; i<n; i++){
        new sn().play()
    }
}



