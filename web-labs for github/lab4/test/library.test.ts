// test/library.test.ts
import { expect } from 'chai';
import { Library } from '../src/library';

describe('Library Class', () => {
  let library: Library;

  // Створення нового об'єкта Library перед кожним тестом
  beforeEach(() => {
    library = new Library();
  });

  // Тест для додавання книги
  it('should add a book to the library', () => {
    library.addBook('The Great Gatsby');
    const books = library.getBooks();
    expect(books).to.include('The Great Gatsby');
  });

  // Тест для видалення книги
  it('should remove a book from the library', () => {
    library.addBook('1984');
    library.removeBook('1984');
    const books = library.getBooks();
    expect(books).to.not.include('1984');
  });

  // Тест для отримання списку всіх книг
  it('should return the list of books', () => {
    library.addBook('Brave New World');
    library.addBook('Fahrenheit 451');
    const books = library.getBooks();
    expect(books).to.deep.equal(['Brave New World', 'Fahrenheit 451']);
  });
});
