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
  }

  return LocalStorage
});


