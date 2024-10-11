'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Storage = void 0;
var Storage = /** @class */ (function () {
  function Storage() {}
  Storage.prototype.save = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };
  Storage.prototype.load = function (key) {
    var data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  Storage.prototype.remove = function (key) {
    localStorage.removeItem(key);
  };
  Storage.prototype.clear = function () {
    localStorage.clear();
  };
  return Storage;
})();
exports.Storage = Storage;
