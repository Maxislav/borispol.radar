define(function(){
    return function(item){

        var arraySrs;
        var imgs = [];
        var p;

        item.on('click','.button.play', function(){
           if(!imgs.length){

               item.find('.progress').fadeTo(111,1)
               item.find('.progress-bar').css({
                   width: '20%'
               })

               $('#scan').children('p').fadeTo(222,0, function(){

                   p = $(this)

                   p.html('Идет поиск истории').fadeTo(222,1)
               })
               $.ajax({
                   type: "POST",
                   url: 'php/loadUkbbHistory.php',
                   success: function(d){
                       item.find('.progress-bar').css({
                           width: '60%'
                       })
                       arraySrs = JSON.parse(d);
                       setSrc();
                   },
                   error: function(a,b,c){
                       console.log(b)
                   }

               })
           }else{
               main.initPlay(arraySrs.length);
           }
        });

        function setSrc(){
            for(var i = 0; i<arraySrs.length; i++){
                arraySrs[i]='http://meteoinfo.by/radar/UKBB/'+arraySrs[i];
            }
            console.log('parse finish')
            loadImgs();
        }

        function loadImgs(){
            var k = 0;
            p.fadeTo(222,0, function(){
                p.html('Продолжается зарузка изображений').fadeTo(222,1)
            })

            item.find('.progress-bar').css({
                width: '70%'
            })

            for (var i = 0; i<arraySrs.length; i++){
                imgs[i]= new Image();
                item.find('.imgs').append($(imgs[i]));

                imgs[i].onload = finish;
                imgs[i].src = arraySrs[i];
            }

            function finish(){
                k++;
                if(k==10){
                    console.log('loadFinish');
                    main.arrImgUkbb = imgs;
                    item.find('.progress-bar').css({
                        width: '100%'
                    })
                    item.find('.progress').fadeTo(222,0)
                    p.fadeTo(222,0, function(){
                        p.html('найдено 10 изображений').fadeTo(222,1)
                        main.initPlay(arraySrs.length);
                    })

                }
            }
        }
    }
})
