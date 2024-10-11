'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.borrowBook = borrowBook;
exports.returnBook = returnBook;
function borrowBook(book, user) {
  try {
    user.borrowBook(book);
    showNotification('Book "'.concat(book.title, '" borrowed successfully!'));
  } catch (error) {
    showNotification(error.message);
  }
}
function returnBook(book, user) {
  try {
    user.returnBook(book);
    showNotification('Book "'.concat(book.title, '" returned successfully!'));
  } catch (error) {
    showNotification(error.message);
  }
}
function showNotification(message) {
  var notification = document.getElementById('notification');
  if (notification) {
    notification.textContent = message;
    notification.classList.remove('d-none');
    setTimeout(function () {
      return notification.classList.add('d-none');
    }, 3000);
  }
}
