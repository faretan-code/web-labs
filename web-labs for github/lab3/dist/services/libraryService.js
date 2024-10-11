"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
var LibraryService = /** @class */ (function () {
    function LibraryService(bookStorage, userStorage) {
        this.bookStorage = bookStorage;
        this.userStorage = userStorage;
    }
    LibraryService.prototype.addBook = function (book) {
        console.log(book);
        var books = this.bookStorage.load();
        books.push(book);
        this.bookStorage.save(books);
    };
    LibraryService.prototype.getBooks = function () {
        return this.bookStorage.load() || [];
    };
    LibraryService.prototype.getBookById = function (id) {
        var books = this.getBooks();
        return books.find(function (book) { return book.id === id; });
    };
    LibraryService.prototype.addUser = function (user) {
        var users = this.userStorage.load();
        users.push(user);
        this.userStorage.save(users);
    };
    LibraryService.prototype.getUsers = function () {
        return this.userStorage.load() || [];
    };
    LibraryService.prototype.getUserById = function (id) {
        var users = this.getUsers();
        return users.find(function (user) { return user.id === id; });
    };
    LibraryService.prototype.saveUsers = function () {
        var users = this.getUsers();
        this.userStorage.save(users);
    };
    LibraryService.prototype.borrowBook = function (userId, bookId) {
        var user = this.getUserById(userId);
        var book = this.getBookById(bookId);
        if (!user || !book || book.borrowerId !== undefined) {
            return false;
        }
        user.borrowedBooks.push(book);
        book.borrowerId = userId;
        this.updateBook(book);
        this.saveUsers();
        this.saveData();
        return true;
    };
    LibraryService.prototype.returnBook = function (userId, bookId) {
        var user = this.getUserById(userId);
        var book = this.getBookById(bookId);
        if (!user || !book || book.borrowerId !== userId) {
            return false;
        }
        user.borrowedBooks = user.borrowedBooks.filter(function (b) { return b.id !== bookId; });
        book.borrowerId = undefined;
        this.updateBook(book);
        this.saveUsers();
        this.saveData();
        return true;
    };
    LibraryService.prototype.updateBook = function (updatedBook) {
        var books = this.getBooks();
        var index = books.findIndex(function (book) { return book.id === updatedBook.id; });
        if (index !== -1) {
            books[index] = updatedBook;
            this.bookStorage.save(books);
        }
    };
    LibraryService.prototype.saveData = function () {
        this.bookStorage.save(this.getBooks());
        this.userStorage.save(this.getUsers());
    };
    return LibraryService;
}());
exports.LibraryService = LibraryService;
