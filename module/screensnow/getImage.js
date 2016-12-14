/**
 * Created by maxislav on 14.12.16.
 */
define(function () {

  const images = {};

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


  function getImage(url, cache) {
    
    return new Promise((resolve, reject)=>{
      if(cache && images[url]){
        resolve(images[url]);
        return
      }


      var xhr = createCORSRequest("GET", url);
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onerror = function (e) {
        reject(e);
      };

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
          const imgData = xhr.response;

          const img = new window.Image();

          const blob = new window.Blob([new Uint8Array(imgData)], {type: 'image/png'});

          img.onload = function () {

            (window.URL || window.webkitURL).revokeObjectURL(img.src);
            images[url] = img;
            resolve(img);
            //callback && callback(null, img);
          };

          img.src = (window.URL || window.webkitURL).createObjectURL(blob);


        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.send();



    })
  }
  return getImage
})