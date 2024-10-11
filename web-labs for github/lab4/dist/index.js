'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var book_1 = require('./models/book');
var user_1 = require('./models/user');
var libraryService_1 = require('./services/libraryService');
var storage_1 = require('./utils/storage');
var bookStorage = new storage_1.Storage('books');
var userStorage = new storage_1.Storage('users');
var libraryService = new libraryService_1.LibraryService(
  bookStorage,
  userStorage,
);
var bookForm = document.getElementById('book-form');
var userForm = document.getElementById('user-form');
var bookList = document.getElementById('book-list');
var userList = document.getElementById('user-list');
var notificationContainer = document.createElement('div');
notificationContainer.className = 'position-fixed top-0 end-0 p-3';
document.body.appendChild(notificationContainer);
function showNotification(message, type) {
  var alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-'.concat(
    type,
    ' alert-dismissible fade show',
  );
  alertDiv.role = 'alert';
  alertDiv.innerHTML = '\n        '.concat(
    message,
    '\n        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="\u0417\u0430\u043A\u0440\u0438\u0442\u0438"></button>\n    ',
  );
  notificationContainer.appendChild(alertDiv);
  setTimeout(function () {
    alertDiv.classList.remove('show');
    alertDiv.classList.add('hide');
    alertDiv.remove();
  }, 3000);
}
userForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var nameInput = document.getElementById('user-name');
  var emailInput = document.getElementById('user-email');
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  if (!name || !email || !validateEmail(email)) {
    showNotification('Будь ласка, заповніть всі поля правильно.', 'danger');
    return;
  }
  var user = new user_1.User(Date.now(), name, email);
  libraryService.addUser(user);
  renderUsers();
  nameInput.value = '';
  emailInput.value = '';
  showNotification('Користувач успішно доданий!', 'success');
});
function renderUsers() {
  var users = libraryService.getUsers() || [];
  userList.innerHTML = users
    .map(function (user) {
      return '\n        <li class="list-group-item">\n            '
        .concat(user.id, ' ')
        .concat(user.name, ' (')
        .concat(user.email, ')}\n        </li>\n    ');
    })
    .join('');
}
function renderBooks() {
  var books = libraryService.getBooks() || [];
  bookList.innerHTML = books
    .map(function (book) {
      return '\n        <li class="list-group-item d-flex justify-content-between align-items-center">\n            '
        .concat(book.title ? book.title : 'Невідома книга', ' by ')
        .concat(book.author, ' (')
        .concat(
          book.year,
          ')\n            <button class="btn btn-primary btn-sm borrow-button" data-id="',
        )
        .concat(book.id, '">\n                ')
        .concat(
          book.borrowerId ? 'Повернути' : 'Позичити',
          '  \n            </button>\n        </li>\n    ',
        );
    })
    .join('');
  var borrowButtons = document.querySelectorAll('.borrow-button');
  borrowButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var bookId = parseInt(button.getAttribute('data-id') || '0');
      var book = libraryService.getBookById(bookId);
      var user = libraryService.getUsers()[0];
      if (!book) {
        showNotification('Книга не знайдена.', 'danger');
        return;
      }
      if (!user) {
        showNotification('Користувач не знайдений.', 'danger');
        return;
      }
      if (!book.borrowerId) {
        if (user.borrowedBooks.length >= 3) {
          showNotification(
            'Користувач не може позичити більше 3-х книг.',
            'danger',
          );
          return;
        }
        libraryService.borrowBook(user.id, book.id);
        // Оновлюємо інтерфейс після позичення
        renderBooks();
        renderUsers();
        showNotification(
          '\u041A\u043D\u0438\u0433\u0430 "'
            .concat(
              book.title,
              '" \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0430 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0435\u043C ',
            )
            .concat(user.name, '.'),
          'success',
        );
      } else {
        libraryService.returnBook(user.id, book.id);
        // Оновлюємо інтерфейс після повернення
        renderBooks();
        renderUsers();
        showNotification(
          '\u041A\u043D\u0438\u0433\u0430 "'
            .concat(
              book.title,
              '" \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0430 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0435\u043C ',
            )
            .concat(user.name, '.'),
          'success',
        );
      }
    });
  });
}
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
renderBooks();
renderUsers();
var validation_1 = require('./utils/validation');
bookForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('smth');
  var titleInput = document.getElementById('book-title');
  var authorInput = document.getElementById('book-author');
  var yearInput = document.getElementById('book-year');
  (0, validation_1.clearErrorMessage)('titleError');
  (0, validation_1.clearErrorMessage)('authorError');
  (0, validation_1.clearErrorMessage)('yearError');
  var valid = true;
  if (!(0, validation_1.validateBookTitle)(titleInput.value)) {
    (0, validation_1.showErrorMessage)(
      'titleError',
      'Назва книги не може бути порожньою.',
    );
    valid = false;
  }
  if (!(0, validation_1.validateBookAuthor)(authorInput.value)) {
    (0, validation_1.showErrorMessage)(
      'authorError',
      'Автор не може бути порожнім.',
    );
    valid = false;
  }
  if (!(0, validation_1.validateBookYear)(yearInput.value)) {
    (0, validation_1.showErrorMessage)(
      'yearError',
      'Рік видання повинен бути дійсним роком.',
    );
    valid = false;
  }
  if (valid) {
    var newBook = new book_1.Book(
      Date.now(),
      titleInput.value,
      authorInput.value,
      parseInt(yearInput.value),
      undefined,
    );
    libraryService.addBook(newBook);
    renderBooks();
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
    (0, validation_1.clearErrorMessage)('titleError');
    (0, validation_1.clearErrorMessage)('authorError');
    (0, validation_1.clearErrorMessage)('yearError');
    showNotification('Книга успішно додана!', 'success');
  }
});
userForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var nameInput = document.getElementById('user-name');
  var emailInput = document.getElementById('user-email');
  (0, validation_1.clearErrorMessage)('userIdError');
  var valid = true;
  if (!(0, validation_1.validateUserName)(nameInput.value)) {
    (0, validation_1.showErrorMessage)(
      'userIdError',
      "Ім'я не може бути порожнім.",
    );
    valid = false;
  }
  if (!(0, validation_1.validateUserEmail)(emailInput.value)) {
    (0, validation_1.showErrorMessage)(
      'userIdError',
      'Неправильний формат електронної пошти.',
    );
    valid = false;
  }
  if (valid) {
    var newUser = new user_1.User(
      Date.now(),
      nameInput.value,
      emailInput.value,
    );
    libraryService.addUser(newUser);
    renderUsers();
    nameInput.value = '';
    emailInput.value = '';
  }
});
