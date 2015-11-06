
define(function (require, exports, module) {

    var elContainer = $('#forecastHead');
    var list;
    var strElday;

    var arrayHours = [];


    function loadUi(callback){
        require([
            'jqueryUi',
            'text' + '!' + 'lib/jquery/jquery-ui-1.11.1/jquery-ui.min.css'
        ], function(a , css){
            //$(document).tooltip()
            if (!app.css['ui']) {
                $('head').append('<style>' + css + '</style>');
                app.css['ui'] = true;
            }
            callback && callback();
        });

    }


   // $( document ).tooltip();
    function greateItems(){
        var el = $(document.createElement('div'))
        el.attr('class', 'container-list');
        elContainer.append(el);
        var elDay;

        var dateDay;

        function fillday(_elDay, elHour, flag){
            _elDay.append(elHour);

            if(flag){
                el.append(_elDay)
            }

        }
        function fillDrip(elHour, _3h){
            var container = elHour.find('.drip-container');

            container.css('textAlign', 'left');
           // container.css('padding', '0 5px');
           // container.css('marginTop', '-5px');
            _3h = parseFloat(_3h);

            var n = _3h*10;
            n = Math.ceil(n);

            function createDrip(empty){
                var elDrip = new Image();
                if(!empty){
                    elDrip.src = 'img/drip.png';
                }else{
                    elDrip.style.visibility = 'hidden'
                }

                elDrip.setAttribute('class', empty? 'empty-drip' : 'one-drip');
                elDrip.style.display = 'inline-block';

                container.append(elDrip)
            }

            for(var i = 0 ; i< n; i++){
                createDrip()
            }
            if(n==0){
                createDrip(true)
            }

        }


        for(var i = 0 ; i<19; i++){

            var ico = list[i].weather[0].icon;
            var elHour = $(strElday);
            var hh = '' +  DateFormat.format.date(new Date(list[i].dt*1000), 'HH');
            var color = getColorHour(hh);
            elHour.css('background', hexToRgba(color));
            //console.log(list[i]);
            arrayHours.push(elHour);

            var title = 'Clear';
            if(list[i].rain && list[i].rain['3h']){
                title = 'Rain 3h: ' +list[i].rain['3h']+"mm";
                fillDrip(elHour, list[i].rain['3h'] )
            }else{
                fillDrip(elHour, 0 )
            }

            elHour.attr('title',title);


          //  hover(elHour);

            var date = DateFormat.format.date(new Date(list[i].dt*1000), 'HH:mm');
            elHour.find('.date').html(date);
            var elIcon = elHour.find('.img-son');

            var img = new Image();
            img.src ='img/icon/i'+ico+'.png';
            elIcon.append(img);
            var t = parseInt(list[i].main.temp);
            elHour.find('.temp').html((0<t ?'+':'') + t+'&deg;C');

            if(dateDay !=  DateFormat.format.date(new Date(list[i].dt*1000), 'dd')){
                dateDay =  DateFormat.format.date(new Date(list[i].dt*1000), 'dd');
                elDay = $(document.createElement('div'));
                elDay.attr('class', 'day-of-month');
                elDay.append('<div class="date-month-title">'+DateFormat.format.date(new Date(list[i].dt*1000), 'E dd')+'</div>')
                fillday(elDay,elHour, true)
            }else{
                fillday(elDay,elHour, false)
            }

        }
        hover();


    }

    /**
     * <item name="hh00" type="color">#6f0057ff</item>
     <item name="hh03" type="color">#350057ff</item>
     <item name="hh06" type="color">#2b0057ff</item>
     <item name="hh09" type="color">#1f0057ff</item>
     <item name="hh12" type="color">#150057ff</item>
     <item name="hh15" type="color">#200057ff</item>
     <item name="hh18" type="color">#2b0057ff</item>
     <item name="hh21" type="color">#430057ff</item>
     */
    var R = {
        color: {
            hh00: '#6f0057ff',
            hh03: '#350057ff',
            hh06: '#2b0057ff',
            hh09: '#1f0057ff',
            hh12: '#150057ff',
            hh15: '#200057ff',
            hh18: '#2b0057ff',
            hh21: '#430057ff'
        }
    };

    var startHover = false;
    function hover(){



       /* loadUi(function(){
            $(el).tooltip()
        });*/
        if(!startHover){
            elContainer.on('mouseenter', function(){
               // console.log(this)
                elContainer.off('mouseenter');


                    loadUi(function(){
                        var  i = arrayHours.length;
                        while(0<i--) {
                            $(arrayHours[i]).tooltip({
                                tooltipClass: "tooltip-styling"
                            });
                        }
                    });

                startHover = true
            })
        }
    }

    function hexToRgba(hex) {
        var bigint, r, g, b, a;
        //Remove # character
        var re = /^#?/;
        var aRgb = hex.replace(re, '');
        bigint = parseInt(aRgb, 16);

        //If in #FFF format
        if (aRgb.length == 3) {
            r = (bigint >> 4) & 255;
            g = (bigint >> 2) & 255;
            b = bigint & 255;
            return "rgba(" + r + "," + g + "," + b + ",1)";
        }

        //If in #RRGGBB format
        if (aRgb.length >= 6) {
            r = (bigint >> 16) & 255;
            g = (bigint >> 8) & 255;
            b = bigint & 255;
            var rgb = r + "," + g + "," + b;

            //If in #AARRBBGG format
            if (aRgb.length == 8) {
                a = ((bigint >> 24) & 255) / 255;
                return "rgba(" + rgb + "," + a.toFixed(1) + ")";
            }
        }
        return "rgba(" + rgb + ",1)";
    }

    function getColorHour(HH){
        switch (HH){
            case "00":
                return R.color.hh00;
            case "03":
                return R.color.hh03;
            case "06":
                return R.color.hh06;
            case "09":
                return R.color.hh09;
            case "12":
                return R.color.hh12;
            case "15":
                return R.color.hh15;
            case "18":
                return R.color.hh18;
            case "21":
                return R.color.hh21;
            default:
                return R.color.hh15;
        }
    }




    return function(html){
        strElday = html;
        $.ajax({
            type: "GET",
            url: 'php/forecast.php',
            dataType: 'json',
            success: function(d){
                list = d.list;
                greateItems();
                //console.log(d)
              /*  item.find('.progress-bar').css({
                    width: '60%'
                })
                arraySrs = JSON.parse(d);
                setSrc();*/
            },
            error: function(a,b,c){
                console.log(b)
            }

        })
       /* $.ajax({

            url: 'php/forecast.php',
            success: function(xml){
                console.log(xml)
            }
        })*/
    };
});

/*var forecast = {
    init: function(html, success){

    },
    show: function(){
        alert('oo')
    }

}*/
