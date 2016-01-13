/**
 * Created by mars on 12.01.16.
 */
(function (d, w, c) {
//http://borispol.hol.es
    if (!/borispol/.test(window.location.origin)){
        return
    }

    require(['text!' + 'module/ymetrika/ymetrika.html'], function (html) {
        var div = $(html);
        document.body.appendChild(div[0]);


       var dNscr =   document
             .createElement('noscript')
             .appendChild(document
                 .createElement('div'));
           div.append(dNscr);


        var imgYm = new Image();
        imgYm.src = "//mc.yandex.ru/watch/23847604";
        imgYm.style.position = 'absolute';
        imgYm.style.left = '-9999px';
        dNscr.appendChild(imgYm);

        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter23847604 = new Ya.Metrika({id: 23847604,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    trackHash: true
                });
            } catch (e) {
            }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () {
                n.parentNode.insertBefore(s, n);
            };
        s.type = "text/javascript";
        s.async = true;
        s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    })

})(document, window, "yandex_metrika_callbacks");