define(function () {
  'use strict';

  class LocalStorage {
    constructor() {
      this._localStorage = window.localStorage;
      this.prefix = window.location.origin.replace(/http:\/\//g,'');
      this._hash = this._localStorage.getItem(this.prefix + '-' + 'id-user');
    }

    get hash() {
      return this._hash;
    }

    set hash(val) {
      this._localStorage.setItem(this.prefix + '-' + 'id-user', val);
      this._hash = val;
    }
    
    /*makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      if(-1<this.hashes.indexOf(text)){
        return this.makeid()
      }
      return text;
    }*/
  }

  return LocalStorage
});


