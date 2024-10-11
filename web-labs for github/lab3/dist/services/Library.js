"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
    }
    Library.prototype.addItem = function (item) {
        this.items.push(item);
        this.save();
    };
    Library.prototype.removeItem = function (item) {
        this.items = this.items.filter(function (i) { return i !== item; });
        this.save();
    };
    Library.prototype.findItem = function (predicate) {
        return this.items.find(predicate);
    };
    Library.prototype.getItems = function () {
        return this.items;
    };
    Library.prototype.save = function () {
        localStorage.setItem('library', JSON.stringify(this.items));
    };
    Library.prototype.load = function () {
        var data = localStorage.getItem('library');
        if (data) {
            this.items = JSON.parse(data);
        }
    };
    return Library;
}());
exports.Library = Library;
