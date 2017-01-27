let loadImage;
const define = (f)=>{
  loadImage = f();
};

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
          const blob = new Blob([imgData], {type: 'image/png'});
          resolve(xhr.response);
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
});


onmessage = (e)=>{
  loadImage(e.data[0])
    .then(arrayBuffer=>{
      postMessage(arrayBuffer, [arrayBuffer])
    })
};
