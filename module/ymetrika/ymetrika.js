/**
 * Created by mars on 12.01.16.
 */
(function (d, w, c) {

    require(['text!' + 'module/ymetrika/ymetrika.html'], function (html) {
        var div = $(html)
        document.body.appendChild(div[0]);
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