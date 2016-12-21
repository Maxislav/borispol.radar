'use strict';

define(['js/tornado-img.js', 'jquery'],function (tornadoLoader, $) {

    window.app = {
        css: {},
        currentMoule: null,
        name: null,
        init: function () {
            var s = this;

            var hash = window.location.hash.replace('#', '');
            $(window).on('hashchange', function () {
                hash = window.location.hash.replace('#', '');
                s.loadmodulle(hash)
            });

            if (window.location.hash.replace('#', '')) {
                s.loadmodulle(window.location.hash.replace('#', ''))
            } else {
                try{
                    history.replaceState(undefined, undefined, "#home");
                    s.loadmodulle('home')
                }catch (err){
                    console.log(err)
                }
            }
            //todo  снег
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?id=703448&units=metric&mode=json&APPID=19e738728f18421f2074f369bdb54e81',
                jsonp: "callback",
                dataType: "jsonp",
                success: function( response ) {
                    try{
                        console.info( response.weather[0].main ); // server response
                    }catch (err){
                        console.log(err)
                    }

                    if(response.weather && response.weather.length && response.weather[0].main == 'Snow'){
                        require(['screensnow'], function (d) {
                            // console.log(d)
                        })
                    }else{
                        require(['jqueryUi'], function(){
                            $('.m-container').draggable({handle: ".header"})
                        });
                    }
                }
            });


            s.loadForecast();
            s.getBrr();

        },
        loadForecast: function () {
            var s = this;
            (function a(module) {
                require([
                    module,
                    'text' + '!' + module + '.html',
                    'text' + '!' + module + '.css'
                ], function (m, html, css) {
                    if (!s.css[module]) {
                        $('head').append('<style>' + css + '</style>')
                        s.css[module] = true;
                    }
                    m(html);
                    //console.log(m);
                })
            }('forecast'))
        },
        loadmodulle: function (module) {
            var s = this;
            s.currentMoule && s.currentMoule.hide();
            s.name = module;
            require([
                module,
                'text' + '!' + module + '.html',
                'text' + '!' + module + '.css'
            ], function (m, html, css) {

                if (!s.css[module]) {
                    $('head').append('<style>' + css + '</style>')
                    s.css[module] = true;
                }
                s.currentMoule = m || window[module];
                s.currentMoule && s.currentMoule.show(html, app.navTabs(s.currentMoule.navTabs));
            })
        },
        navTabs: function (n) {
            var s = this;
            var li;
            $('.nav.nav-tabs').find('li').removeClass('active');
            var a = $('.nav.nav-tabs').find("li a[href=\'#"+s.name+"\']")
            li = a.parent();
            li.addClass('active');
            return li
        },
        mask: {
            show: function (el) {
                var s = this;
                if (el) {
                    el.append(tornadoLoader);

                    el.find('.mask').height(el.height()).fadeTo(222, 1);
                    el.find('.mask').css({
                        position: 'absolute'
                    })
                    el.find('.svg').css({
                        position: 'absolute',
                        left: el.width() / 2 - 30 + 'px',
                        top: el.height() / 2 - 30 + 'px'
                    })
                } else {
                    $('body').append(tornadoLoader);


                    $('.mask svg').click(function () {
                        app.mask.hide()
                    })

                    $('.mask').height($(window).height()).fadeTo(222, 1);
                    $('.svg').css({
                        position: 'absolute',
                        left: $(window).width() / 2 - 30 + 'px',
                        top: $(window).height() / 2 - 30 + 'px'
                    })
                }
                return el.find('.mask')
            },
            hide: function (el) {
                if (el) {
                    el.find('.mask').fadeTo(222, 0, function () {
                        $(this).remove()
                    })
                } else {
                    $('.mask').fadeTo(222, 0, function () {
                        $(this).remove()
                    })
                }
            },
            remove: function (el) {
                el.remove()
            }


        },
        getBrr: function () {
            $.ajax({
                url: 'Browser.php',
                success: function (d) {

                    brr = d;
                    app.setBg()
                },
                error: function (a, b) {

                }
            })

        },
        setBg: function () {

            function getRandomArbitary(min, max) {
                return Math.random() * (max - min) + min;
            }

            var x = Math.floor(getRandomArbitary(1, 9.99))

            var url = 'img/bg/' + x + '.jpg?b=' + new Date().getSeconds()
            var img;
            var beforeTime = new Date().getTime()
            var afterTime
            var difTime

            var loaderImg = new Image()

            loaderImg.onload = speadLoading
            loaderImg.src = 'img/loader.png?b=' + new Date().getTime()
            function speadLoading() {
                afterTime = new Date().getTime()
                difTime = afterTime - beforeTime
                if (difTime < 2000) {
                    img = new Image()
                    img.onload = setImg
                    img.src = url
                }
                console.log(difTime)
            }


            function setImg() {
                document.body.style.backgroundImage = "url(" + url + ")";
                document.body.style.backgroundSize = '100% auto';

            }
        }
    }
})
