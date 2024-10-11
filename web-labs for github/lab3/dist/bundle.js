/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar book_1 = __webpack_require__(/*! ./models/book */ \"./src/models/book.ts\");\nvar user_1 = __webpack_require__(/*! ./models/user */ \"./src/models/user.ts\");\nvar libraryService_1 = __webpack_require__(/*! ./services/libraryService */ \"./src/services/libraryService.ts\");\nvar storage_1 = __webpack_require__(/*! ./utils/storage */ \"./src/utils/storage.ts\");\nvar bookStorage = new storage_1.Storage('books');\nvar userStorage = new storage_1.Storage('users');\nvar libraryService = new libraryService_1.LibraryService(bookStorage, userStorage);\nvar bookForm = document.getElementById('book-form');\nvar userForm = document.getElementById('user-form');\nvar bookList = document.getElementById('book-list');\nvar userList = document.getElementById('user-list');\nvar notificationContainer = document.createElement('div');\nnotificationContainer.className = 'position-fixed top-0 end-0 p-3';\ndocument.body.appendChild(notificationContainer);\nfunction showNotification(message, type) {\n    var alertDiv = document.createElement('div');\n    alertDiv.className = \"alert alert-\".concat(type, \" alert-dismissible fade show\");\n    alertDiv.role = 'alert';\n    alertDiv.innerHTML = \"\\n        \".concat(message, \"\\n        <button type=\\\"button\\\" class=\\\"btn-close\\\" data-bs-dismiss=\\\"alert\\\" aria-label=\\\"\\u0417\\u0430\\u043A\\u0440\\u0438\\u0442\\u0438\\\"></button>\\n    \");\n    notificationContainer.appendChild(alertDiv);\n    setTimeout(function () {\n        alertDiv.classList.remove('show');\n        alertDiv.classList.add('hide');\n        alertDiv.remove();\n    }, 3000);\n}\nbookForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    var titleInput = document.getElementById('book-title');\n    var authorInput = document.getElementById('book-author');\n    var yearInput = document.getElementById('book-year');\n    var title = titleInput.value.trim();\n    var author = authorInput.value.trim();\n    var year = parseInt(yearInput.value);\n    if (!title || !author || isNaN(year) || year < 0) {\n        showNotification('Будь ласка, заповніть всі поля правильно.', 'danger');\n        return;\n    }\n    var book = new book_1.Book(Date.now(), title, author, year);\n    libraryService.addBook(book);\n    renderBooks();\n    titleInput.value = '';\n    authorInput.value = '';\n    yearInput.value = '';\n    showNotification('Книга успішно додана!', 'success');\n});\nuserForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    var nameInput = document.getElementById('user-name');\n    var emailInput = document.getElementById('user-email');\n    var name = nameInput.value.trim();\n    var email = emailInput.value.trim();\n    if (!name || !email || !validateEmail(email)) {\n        showNotification('Будь ласка, заповніть всі поля правильно.', 'danger');\n        return;\n    }\n    var user = new user_1.User(Date.now(), name, email);\n    libraryService.addUser(user);\n    renderUsers();\n    nameInput.value = '';\n    emailInput.value = '';\n    showNotification('Користувач успішно доданий!', 'success');\n});\nfunction renderUsers() {\n    var users = libraryService.getUsers() || [];\n    userList.innerHTML = users.map(function (user) { return \"\\n        <li class=\\\"list-group-item\\\">\\n            \".concat(user.id, \" \").concat(user.name, \" (\").concat(user.email, \") - \\u041F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u043E \\u043A\\u043D\\u0438\\u0433: \").concat(user.borrowedBooks.length, \"\\n        </li>\\n    \"); }).join('');\n}\nfunction renderBooks() {\n    var books = libraryService.getBooks() || [];\n    bookList.innerHTML = books.map(function (book) { return \"\\n        <li class=\\\"list-group-item d-flex justify-content-between align-items-center\\\">\\n            \".concat(book.title ? book.title : 'Невідома книга', \" by \").concat(book.author, \" (\").concat(book.year, \")\\n            <button class=\\\"btn btn-primary btn-sm borrow-button\\\" data-id=\\\"\").concat(book.id, \"\\\">\\n                \").concat(book.borrowerId ? 'Повернути' : 'Позичити', \"  \\n            </button>\\n        </li>\\n    \"); }).join('');\n    // Додаємо обробники подій для кнопок позичити/повернути\n    var borrowButtons = document.querySelectorAll('.borrow-button');\n    borrowButtons.forEach(function (button) {\n        button.addEventListener('click', function () {\n            var bookId = parseInt(button.getAttribute('data-id') || '0');\n            var book = libraryService.getBookById(bookId);\n            var user = libraryService.getUsers()[0];\n            if (!book) {\n                showNotification('Книга не знайдена.', 'danger');\n                return;\n            }\n            if (!user) {\n                showNotification('Користувач не знайдений.', 'danger');\n                return;\n            }\n            if (!book.borrowerId) {\n                // Перевіряємо, чи користувач вже позичив 3 книги\n                if (user.borrowedBooks.length >= 3) {\n                    showNotification('Користувач не може позичити більше 3-х книг.', 'danger');\n                    return;\n                }\n                libraryService.borrowBook(user.id, book.id);\n                // Оновлюємо інтерфейс після позичення\n                renderBooks();\n                renderUsers();\n                showNotification(\"\\u041A\\u043D\\u0438\\u0433\\u0430 \\\"\".concat(book.title, \"\\\" \\u0443\\u0441\\u043F\\u0456\\u0448\\u043D\\u043E \\u043F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u0430 \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0435\\u043C \").concat(user.name, \".\"), 'success');\n            }\n            else {\n                libraryService.returnBook(user.id, book.id);\n                // Оновлюємо інтерфейс після повернення\n                renderBooks();\n                renderUsers();\n                showNotification(\"\\u041A\\u043D\\u0438\\u0433\\u0430 \\\"\".concat(book.title, \"\\\" \\u0443\\u0441\\u043F\\u0456\\u0448\\u043D\\u043E \\u043F\\u043E\\u0432\\u0435\\u0440\\u043D\\u0443\\u0442\\u0430 \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0435\\u043C \").concat(user.name, \".\"), 'success');\n            }\n        });\n    });\n}\nfunction validateEmail(email) {\n    var re = /\\S+@\\S+\\.\\S+/;\n    return re.test(email);\n}\nrenderBooks();\nrenderUsers();\nvar validation_1 = __webpack_require__(/*! ./utils/validation */ \"./src/utils/validation.ts\");\nbookForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    var titleInput = document.getElementById('book-title');\n    var authorInput = document.getElementById('book-author');\n    var yearInput = document.getElementById('book-year');\n    (0, validation_1.clearErrorMessage)('titleError');\n    (0, validation_1.clearErrorMessage)('authorError');\n    (0, validation_1.clearErrorMessage)('yearError');\n    var valid = true;\n    if (!(0, validation_1.validateBookTitle)(titleInput.value)) {\n        (0, validation_1.showErrorMessage)('titleError', 'Назва книги не може бути порожньою.');\n        valid = false;\n    }\n    if (!(0, validation_1.validateBookAuthor)(authorInput.value)) {\n        (0, validation_1.showErrorMessage)('authorError', 'Автор не може бути порожнім.');\n        valid = false;\n    }\n    if (!(0, validation_1.validateBookYear)(yearInput.value)) {\n        (0, validation_1.showErrorMessage)('yearError', 'Рік видання повинен бути дійсним роком.');\n        valid = false;\n    }\n    if (valid) {\n        var newBook = new book_1.Book(Date.now(), titleInput.value, authorInput.value, parseInt(yearInput.value), undefined);\n        libraryService.addBook(newBook);\n        renderBooks();\n        titleInput.value = '';\n        authorInput.value = '';\n        yearInput.value = '';\n    }\n});\nuserForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    var nameInput = document.getElementById('user-name');\n    var emailInput = document.getElementById('user-email');\n    (0, validation_1.clearErrorMessage)('userIdError');\n    var valid = true;\n    if (!(0, validation_1.validateUserName)(nameInput.value)) {\n        (0, validation_1.showErrorMessage)('userIdError', 'Ім\\'я не може бути порожнім.');\n        valid = false;\n    }\n    if (!(0, validation_1.validateUserEmail)(emailInput.value)) {\n        (0, validation_1.showErrorMessage)('userIdError', 'Неправильний формат електронної пошти.');\n        valid = false;\n    }\n    if (valid) {\n        var newUser = new user_1.User(Date.now(), nameInput.value, emailInput.value);\n        libraryService.addUser(newUser);\n        renderUsers();\n        // Очищення полів\n        nameInput.value = '';\n        emailInput.value = '';\n    }\n});\n\n\n//# sourceURL=webpack://untitled3/./src/index.ts?");

/***/ }),

/***/ "./src/models/book.ts":
/*!****************************!*\
  !*** ./src/models/book.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Book = void 0;\nvar Book = /** @class */ (function () {\n    function Book(id, title, author, year, borrowerId) {\n        this.id = id;\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.borrowerId = borrowerId;\n    }\n    return Book;\n}());\nexports.Book = Book;\n\n\n//# sourceURL=webpack://untitled3/./src/models/book.ts?");

/***/ }),

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.User = void 0;\nvar User = /** @class */ (function () {\n    function User(id, name, email) {\n        this.id = id;\n        this.name = name;\n        this.email = email;\n        this.borrowedBooks = []; // Ініціалізуємо як порожній масив\n    }\n    return User;\n}());\nexports.User = User;\n\n\n//# sourceURL=webpack://untitled3/./src/models/user.ts?");

/***/ }),

/***/ "./src/services/libraryService.ts":
/*!****************************************!*\
  !*** ./src/services/libraryService.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LibraryService = void 0;\nvar LibraryService = /** @class */ (function () {\n    function LibraryService(bookStorage, userStorage) {\n        this.bookStorage = bookStorage;\n        this.userStorage = userStorage;\n    }\n    LibraryService.prototype.addBook = function (book) {\n        console.log(book);\n        var books = this.bookStorage.load();\n        books.push(book);\n        this.bookStorage.save(books);\n    };\n    LibraryService.prototype.getBooks = function () {\n        return this.bookStorage.load() || [];\n    };\n    LibraryService.prototype.getBookById = function (id) {\n        var books = this.getBooks();\n        return books.find(function (book) { return book.id === id; });\n    };\n    LibraryService.prototype.addUser = function (user) {\n        var users = this.userStorage.load();\n        users.push(user);\n        this.userStorage.save(users);\n    };\n    LibraryService.prototype.getUsers = function () {\n        return this.userStorage.load() || [];\n    };\n    LibraryService.prototype.getUserById = function (id) {\n        var users = this.getUsers();\n        return users.find(function (user) { return user.id === id; });\n    };\n    LibraryService.prototype.saveUsers = function () {\n        var users = this.getUsers();\n        this.userStorage.save(users);\n    };\n    LibraryService.prototype.borrowBook = function (userId, bookId) {\n        var user = this.getUserById(userId);\n        var book = this.getBookById(bookId);\n        if (!user || !book || book.borrowerId !== undefined) {\n            return false;\n        }\n        user.borrowedBooks.push(book);\n        book.borrowerId = userId;\n        this.updateBook(book);\n        this.saveUsers();\n        this.saveData();\n        return true;\n    };\n    LibraryService.prototype.returnBook = function (userId, bookId) {\n        var user = this.getUserById(userId);\n        var book = this.getBookById(bookId);\n        if (!user || !book || book.borrowerId !== userId) {\n            return false;\n        }\n        user.borrowedBooks = user.borrowedBooks.filter(function (b) { return b.id !== bookId; });\n        book.borrowerId = undefined;\n        this.updateBook(book);\n        this.saveUsers();\n        this.saveData();\n        return true;\n    };\n    LibraryService.prototype.updateBook = function (updatedBook) {\n        var books = this.getBooks();\n        var index = books.findIndex(function (book) { return book.id === updatedBook.id; });\n        if (index !== -1) {\n            books[index] = updatedBook;\n            this.bookStorage.save(books);\n        }\n    };\n    LibraryService.prototype.saveData = function () {\n        this.bookStorage.save(this.getBooks());\n        this.userStorage.save(this.getUsers());\n    };\n    return LibraryService;\n}());\nexports.LibraryService = LibraryService;\n\n\n//# sourceURL=webpack://untitled3/./src/services/libraryService.ts?");

/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Storage = void 0;\nvar Storage = /** @class */ (function () {\n    function Storage(key) {\n        this.key = key;\n    }\n    Storage.prototype.load = function () {\n        var data = localStorage.getItem(this.key);\n        return data ? JSON.parse(data) : [];\n    };\n    Storage.prototype.save = function (data) {\n        localStorage.setItem(this.key, JSON.stringify(data));\n    };\n    Storage.prototype.clear = function () {\n        localStorage.removeItem(this.key);\n    };\n    return Storage;\n}());\nexports.Storage = Storage;\n\n\n//# sourceURL=webpack://untitled3/./src/utils/storage.ts?");

/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateBookTitle = validateBookTitle;\nexports.validateBookAuthor = validateBookAuthor;\nexports.validateBookYear = validateBookYear;\nexports.validateUserName = validateUserName;\nexports.validateUserEmail = validateUserEmail;\nexports.showErrorMessage = showErrorMessage;\nexports.clearErrorMessage = clearErrorMessage;\nfunction validateBookTitle(title) {\n    return title.trim() !== '';\n}\nfunction validateBookAuthor(author) {\n    return author.trim() !== '';\n}\nfunction validateBookYear(year) {\n    var yearNumber = parseInt(year);\n    return !isNaN(yearNumber) && yearNumber > 0 && yearNumber <= new Date().getFullYear();\n}\nfunction validateUserName(name) {\n    return name.trim() !== '';\n}\nfunction validateUserEmail(email) {\n    var emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return emailRegex.test(email);\n}\nfunction showErrorMessage(elementId, message) {\n    var errorElement = document.getElementById(elementId);\n    if (errorElement) {\n        errorElement.textContent = message;\n    }\n}\nfunction clearErrorMessage(elementId) {\n    var errorElement = document.getElementById(elementId);\n    if (errorElement) {\n        errorElement.textContent = ''; // Очищення тексту\n    }\n}\n\n\n//# sourceURL=webpack://untitled3/./src/utils/validation.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;