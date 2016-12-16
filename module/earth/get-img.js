define(function () {

  function template(strings, ...keys) {
    return (function (...values) {
      var dict = values[values.length - 1] || {};
      var result = [strings[0]];
      keys.forEach(function (key, i) {
        var value = Number.isInteger(key) ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    });
  }


  function getImg(args, callback) {

    //var appid = '19e738728f18421f2074f369bdb54e81';

    //var urlTemplate = template`http://c.tile.openstreetmap.org/${0}/${1}/${2}.png`;

    /**
     h = roads only
     m = standard roadmap
     p = terrain
     r = somehow altered roadmap
     s = satellite only
     t = terrain only
     y = hybrid
     */

    var urlTemplate = template`http://mt1.google.com/vt/lyrs=s&x=${1}&y=${2}&z=${0}`;
    //var urlTemplate = template`php/loadtile.php?x=${1}&y=${2}&z=${0}`;
    var url;
    if(Array.isArray(args)){
      url = urlTemplate.apply(null, args);
    }else{
      url = args
    }



    var xhr = createCORSRequest("GET", url);
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onerror = function (e) {
      callback(e);
    };
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
        const imgData = xhr.response;

        const img = new window.Image();

        const blob = new window.Blob([new Uint8Array(imgData)], {type: 'image/png'});

        img.onload = function () {

          (window.URL || window.webkitURL).revokeObjectURL(img.src);
          callback && callback(null, img);
        };

        img.src = (window.URL || window.webkitURL).createObjectURL(blob);


      } else {
        callback(new Error(xhr.statusText));
      }
    };
    xhr.send();
    return xhr;
  }
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  }
  
  
  return getImg;
})
