define(['getimage'], function (getimage) {

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


  function getTile(args){
    var urlTemplate = template`http://mt1.google.com/vt/lyrs=s&x=${1}&y=${2}&z=${0}`;
    //var urlTemplate = template`php/loadtile.php?x=${1}&y=${2}&z=${0}`;
    var url;
    if(Array.isArray(args)){
      url = urlTemplate.apply(null, args);
    }else{
      url = args
    }
    
    return getimage(url, true)
  }
  
  
  
  
  
  return getTile;
})
