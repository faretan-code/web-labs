import { Book } from './models/book';
import { User } from './models/user';
import { LibraryService } from './services/libraryService';
import { Storage } from './utils/storage';

const bookStorage = new Storage<Book>('books');
const userStorage = new Storage<User>('users');
const libraryService = new LibraryService(bookStorage, userStorage);

const bookForm = document.getElementById('book-form') as HTMLFormElement;
const userForm = document.getElementById('user-form') as HTMLFormElement;
const bookList = document.getElementById('book-list') as HTMLUListElement;
const userList = document.getElementById('user-list') as HTMLUListElement;

const notificationContainer = document.createElement('div');
notificationContainer.className = 'position-fixed top-0 end-0 p-3';
document.body.appendChild(notificationContainer);

function showNotification(
  message: string,
  type: 'success' | 'danger' | 'info',
) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрити"></button>
    `;
  notificationContainer.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.classList.remove('show');
    alertDiv.classList.add('hide');
    alertDiv.remove();
  }, 3000);
}

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('user-name') as HTMLInputElement;
  const emailInput = document.getElementById('user-email') as HTMLInputElement;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email || !validateEmail(email)) {
    showNotification('Будь ласка, заповніть всі поля правильно.', 'danger');
    return;
  }

  const user = new User(Date.now(), name, email);
  libraryService.addUser(user);

  renderUsers();

  nameInput.value = '';
  emailInput.value = '';

  showNotification('Користувач успішно доданий!', 'success');
});

function renderUsers() {
  const users = libraryService.getUsers() || [];
  userList.innerHTML = users
    .map(
      (user) => `
        <li class="list-group-item">
            ${user.id} ${user.name} (${user.email})}
        </li>
    `,
    )
    .join('');
}

function renderBooks() {
  const books = libraryService.getBooks() || [];
  bookList.innerHTML = books
    .map(
      (book) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${book.title ? book.title : 'Невідома книга'} by ${book.author} (${book.year})
            <button class="btn btn-primary btn-sm borrow-button" data-id="${book.id}">
                ${book.borrowerId ? 'Повернути' : 'Позичити'}  
            </button>
        </li>
    `,
    )
    .join('');

  const borrowButtons = document.querySelectorAll('.borrow-button');
  borrowButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const bookId = parseInt(button.getAttribute('data-id') || '0');
      const book = libraryService.getBookById(bookId);
      const user = libraryService.getUsers()[0];

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
          `Книга "${book.title}" успішно позичена користувачем ${user.name}.`,
          'success',
        );
      } else {
        libraryService.returnBook(user.id, book.id);

        // Оновлюємо інтерфейс після повернення
        renderBooks();
        renderUsers();
        showNotification(
          `Книга "${book.title}" успішно повернута користувачем ${user.name}.`,
          'success',
        );
      }
    });
  });
}

function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

renderBooks();
renderUsers();

import {
  validateBookTitle,
  validateBookAuthor,
  validateBookYear,
  validateUserName,
  validateUserEmail,
  showErrorMessage,
  clearErrorMessage,
} from './utils/validation';

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('smth');

  const titleInput = document.getElementById('book-title') as HTMLInputElement;
  const authorInput = document.getElementById(
    'book-author',
  ) as HTMLInputElement;
  const yearInput = document.getElementById('book-year') as HTMLInputElement;

  clearErrorMessage('titleError');
  clearErrorMessage('authorError');
  clearErrorMessage('yearError');

  let valid = true;

  if (!validateBookTitle(titleInput.value)) {
    showErrorMessage('titleError', 'Назва книги не може бути порожньою.');
    valid = false;
  }

  if (!validateBookAuthor(authorInput.value)) {
    showErrorMessage('authorError', 'Автор не може бути порожнім.');
    valid = false;
  }

  if (!validateBookYear(yearInput.value)) {
    showErrorMessage('yearError', 'Рік видання повинен бути дійсним роком.');
    valid = false;
  }

  if (valid) {
    const newBook = new Book(
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

    clearErrorMessage('titleError');
    clearErrorMessage('authorError');
    clearErrorMessage('yearError');

    showNotification('Книга успішно додана!', 'success');
  }
});

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('user-name') as HTMLInputElement;
  const emailInput = document.getElementById('user-email') as HTMLInputElement;

  clearErrorMessage('userIdError');

  let valid = true;

  if (!validateUserName(nameInput.value)) {
    showErrorMessage('userIdError', "Ім'я не може бути порожнім.");
    valid = false;
  }

  if (!validateUserEmail(emailInput.value)) {
    showErrorMessage('userIdError', 'Неправильний формат електронної пошти.');
    valid = false;
  }

  if (valid) {
    const newUser = new User(Date.now(), nameInput.value, emailInput.value);
    libraryService.addUser(newUser);
    renderUsers();

    nameInput.value = '';
    emailInput.value = '';
  }
});
