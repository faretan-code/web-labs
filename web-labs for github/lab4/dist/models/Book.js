'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Book = void 0;
var Book = /** @class */ (function () {
  function Book(id, title, author, year, borrowerId) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.borrowerId = borrowerId;
  }
  return Book;
})();
exports.Book = Book;
