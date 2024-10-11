'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateBookTitle = validateBookTitle;
exports.validateBookAuthor = validateBookAuthor;
exports.validateBookYear = validateBookYear;
exports.validateUserName = validateUserName;
exports.validateUserEmail = validateUserEmail;
exports.showErrorMessage = showErrorMessage;
exports.clearErrorMessage = clearErrorMessage;
function validateBookTitle(title) {
  return title.trim() !== '';
}
function validateBookAuthor(author) {
  return author.trim() !== '';
}
function validateBookYear(year) {
  var yearNumber = parseInt(year);
  return (
    !isNaN(yearNumber) &&
    yearNumber > 0 &&
    yearNumber <= new Date().getFullYear()
  );
}
function validateUserName(name) {
  return name.trim() !== '';
}
function validateUserEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function showErrorMessage(elementId, message) {
  var errorElement = document.getElementById(elementId);
  if (errorElement) {
    console.log((errorElement.textContent = message));
  }
}
function clearErrorMessage(elementId) {
  var errorElement = document.getElementById(elementId);
  if (errorElement) {
    console.log((errorElement.textContent = ''));
    console.log('clear is fine');
  }
}
