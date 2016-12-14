/**
 * Created by mars on 12.01.16.
 */

define(['module/ymetrika/permits.js'], function (permits) {
  (function (d, w, c) {
    const rex =  RegExp(permits.allow.join('|'));
    if (!window.location.origin.match(rex)){
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
      imgYm.src = "//mc.yandex.ru/watch/"+permits.id;
      imgYm.style.position = 'absolute';
      imgYm.style.left = '-9999px';
      dNscr.appendChild(imgYm);

      (w[c] = w[c] || []).push(function () {
        try {
          w['yaCounter'+23847604] = new Ya.Metrika({id: permits.id,
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
})
