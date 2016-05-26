
define(function (require, exports, module) {

    var elContainer = $('#forecastHead');
    var list;
    var strElday;

    var arrayHours = [];


    function loadUi(callback){
        require([
            'jqueryUi',
            'text' + '!' + 'lib/jquery/jquery-ui-1.11.4.custom/jquery-ui.min.css'
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
        function fillDrip(elHour, _3h, type){
            var container = elHour.find('.drip-container');


            container.css('textAlign', 'left');
            _3h = parseFloat(_3h);



            var n = _3h*10;
            n = Math.ceil(n);
            function createDrip(empty){
                var elDrip = new Image();
                if(!empty){
                    elDrip.src = type =='snow' ? 'img/snow.png' : 'img/drip.png';
                }else{
                    elDrip.style.visibility = 'hidden'
                }

                if(type=='rain'){
                    elDrip.setAttribute('class', empty ? 'empty-drip' : 'one-drip');
                }
                if(type== 'snow'){
                    elDrip.setAttribute('class', empty ? 'empty-drip' : 'one-snow');
                }

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


         function isArray(val){
            if( Object.prototype.toString.call( val ) === '[object Array]' ) {
                return true
            }
             return false
        };


        if(list && isArray(list) && list.length==0){
            elContainer.append("api.openweathermap.org временно не отвечает на запрос")
            return
        }
        for(var i = 0 ; i<list.length; i++){

            var ico = list[i].weather[0].icon;
            var elHour = $(strElday);
            var hh = '' +  DateFormat.format.date(new Date(list[i].dt*1000), 'HH');
            var color = getColorHour(hh);
            var overDripContainer = elHour.find('.over-drip-container');
            overDripContainer.css('background', 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, '+color+' 100%)');
            overDripContainer.css('background', '-moz-linear-gradient(top, rgba(255,255,255,0) 50%, '+color+' 100%)');

            elHour.css('background', color);
            //console.log(list[i]);
            arrayHours.push(elHour);

            var title = '';

            if(list[i].rain && list[i].rain['3h']){
                title += 'Rain 3h: ' +list[i].rain['3h']+"mm";
                fillDrip(elHour, list[i].rain['3h'], 'rain' )
            }

            if(list[i].snow && list[i].snow['3h']){
                title += ' Snow 3h: ' +list[i].snow['3h']+"mm";
                fillDrip(elHour, list[i].snow['3h'], 'snow' )
            }

            if(!list[i].snow && !list[i].rain){
                title = 'Clear'
            }


           /* {
                fillDrip(elHour, 0 )
            }*/

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
                fillday(elDay, elHour, true)
            }else{
                fillday(elDay,elHour, false)
            }

        }
        hover();

        var elScrollBar = $("#scrollbar2")[0];
        $(elScrollBar).find('.overview').css('width', list.length*52+"px");
        var myScrollBar = window.tinyscrollbar(elScrollBar, {axis: "x"});

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
            hh00: '#99BCFF',
            hh03: '#CCDDFF',
            hh06: '#CDF',
            hh09: '#E6EEFF',
            hh12: '#E6EEFF',
            hh15: '#E6EBF5',
            hh18: '#CCDDFF',
            hh21: '#B3CDFF'
        }
    };

    var startHover = false;
    function hover(){
        if(!startHover){
            elContainer.on('mouseenter', function(){
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
            },
            error: function(a,b,c){
                console.log(b)
            }

        });
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
