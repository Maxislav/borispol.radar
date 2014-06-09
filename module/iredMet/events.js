define(['dateFormat'],function () {
    return function (item) {
        var s = this;
        var gmt = new Date().getTimezoneOffset()/60;
        var amount = 24;
        var img = null;
        loadFirst();

         function loadFirst(){
             if(!img){
                 img = new Image();
                 img.onerror = function(){
                     gmt--;
                     l();
                 }
                 l();
                 function l(){
                     img.onload = function(){
                         app.mask.hide(item.find('.container-imgs'));
                         img = $(img).css({
                             opacity: 0
                         })
                         img.fadeTo(222,1)

                         item.find('.container-imgs').append(img);

                     }
                     img.src = "http://www.metoffice.gov.uk/weather/images/eurir_sat_"+getDate(0)+".jpg"
                 }
             }
         }




        var btnPlay;
        var images = null;
        item.on('click', '.glyphicon-play', function () {
            btnPlay = $(this)
            if($(this).hasClass('active')){
                return
            }
            $(this).addClass('active')
            play($(this));
        }).on('click', '.glyphicon-refresh', function(){

            if(images && images.length){
                app.mask.show(item.find('.container-imgs'));
                for(var i = 0; i< images.length; i++){
                    images[i].remove()
                }
            }
            img.remove();
            img = null;
            images = null;
            loadFirst();
            btnPlay && btnPlay.removeClass('active')


        })

        function play(btn){


            if(!images){
                load(btn)
                return;
            };
            console.log('load finish');
           for(var i = 0; i< amount; i++){
               images[i].fadeTo(222, 1)
           }
            setTimeout(function(){
                fadeTo(amount -1)
            }, 2000);

            function fadeTo(i){
                if(!btn.hasClass('active')){
                    return
                }
                images[i].fadeTo(400, 0, function(){
                  if(i>0){
                        fadeTo(i-1)
                    }else{
                      btn.removeClass('active')
                  }
                })
            }


        }
        function load(btn){
            item.find('.progress-loader').fadeTo(222,1)
            var c = 0
            images = [];
            for(var i = 0; i < amount; i++){
                images[i] = new Image();
                images[i].onload =finish;
                images[i].src = "http://www.metoffice.gov.uk/weather/images/eurir_sat_"+getDate(-i)+".jpg"
            }
            function finish(i){

                c++;
                item.find('.progress-bar').css({
                    width: (100*c/amount) + '%'
                });
                if (c == amount){
                   for(var i = 0; i<amount; i++){
                       images[i]=$(images[i]);
                       images[i].css({
                           opacity: 0
                       })
                       item.find('.container-imgs').append(images[i])
                   }
                    item.find('.progress-loader').fadeTo(222,0)
                   play(btn)
                }
            }
        }

        function getDate(m){
            var d = new Date();
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() +gmt +m);
            return $.format.date(d, 'yyyyMMddHHmm');
        }
    }
})
