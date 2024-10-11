'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Storage = void 0;
var Storage = /** @class */ (function () {
  function Storage(key) {
    this.key = key;
  }
  Storage.prototype.load = function () {
    var data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  };
  Storage.prototype.save = function (data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  };
  Storage.prototype.clear = function () {
    localStorage.removeItem(this.key);
  };
  return Storage;
})();
exports.Storage = Storage;
