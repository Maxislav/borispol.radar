"use strict";
define(function () {

  class MyImage extends window.Image{

    toCanvas(w, h, w1, h1, x, y){
      const canvas =  document.createElement('canvas');
      canvas.width = w ? w : this.width;
      canvas.height = h ? h : this.height;
      const ctx = canvas.getContext('2d')
      if(!w1 && !h1){
        ctx.drawImage(this,0, 0, canvas.width, canvas.height)
      }else{
        ctx.drawImage(this,0, 0, this.width, this.height, x || 0, y || 0, w1, h1)
      }
      //ctx.drawImage(this,0, 0, canvas.width, canvas.height, x || 0, y || 0, w1 || canvas.width , h1 || canvas.height);
      //ctx.drawImage(this,0, 0, canvas.width, canvas.height, x || 0, y || 0, w1 || canvas.width , h1 || canvas.height);
      return canvas
    }


  }
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


  function loadPromise(url) {
    return new Promise((resolve, reject)=>{
      var xhr = createCORSRequest("GET", url);
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onerror = function (e) {
        reject(e);
      };

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
          const imgData = xhr.response;

          const img = new MyImage();

          const blob = new window.Blob([new Uint8Array(imgData)], {type: 'image/png'});

          img.onload = function () {

            (window.URL || window.webkitURL).revokeObjectURL(img.src);
            resolve(img);
          };
          img.src = (window.URL || window.webkitURL).createObjectURL(blob);
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.send();
    });
  }

  function getImage(url, cache) {
    if(cache){
      if(!images[url]){
        images[url] = loadPromise(url)
      }
      return images[url]
    }else{
      return loadPromise(url)
    }
  }
  return getImage
})