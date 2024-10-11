import { Book } from '../models/book';
import { User } from '../models/user';
import { Storage } from '../utils/storage';

export class LibraryService {
  constructor(
    private bookStorage: Storage<Book>,
    private userStorage: Storage<User>,
  ) {}

  addBook(book: Book): void {
    console.log(book);
    const books = this.bookStorage.load();
    books.push(book);
    this.bookStorage.save(books);
  }

  getBooks(): Book[] {
    return this.bookStorage.load() || [];
  }

  getBookById(id: number): Book | undefined {
    const books = this.getBooks();
    return books.find((book) => book.id === id);
  }

  addUser(user: User): void {
    const users = this.userStorage.load();
    users.push(user);
    this.userStorage.save(users);
  }

  getUsers(): User[] {
    return this.userStorage.load() || [];
  }

  getUserById(id: number): User | undefined {
    const users = this.getUsers();
    return users.find((user) => user.id === id);
  }

  saveUsers(): void {
    const users = this.getUsers();
    this.userStorage.save(users);
  }

  borrowBook(userId: number, bookId: number): boolean {
    const user = this.getUserById(userId);
    const book = this.getBookById(bookId);

    if (!user || !book || book.borrowerId !== undefined) {
      return false;
    }

    user.borrowedBooks.push(book);
    book.borrowerId = userId;

    this.updateBook(book);
    this.saveUsers();

    this.saveData();
    return true;
  }

  returnBook(userId: number, bookId: number): boolean {
    const user = this.getUserById(userId);
    const book = this.getBookById(bookId);

    if (!user || !book || book.borrowerId !== userId) {
      return false;
    }

    user.borrowedBooks = user.borrowedBooks.filter((b) => b.id !== bookId);
    book.borrowerId = undefined;

    this.updateBook(book);
    this.saveUsers();

    this.saveData();
    return true;
  }

  updateBook(updatedBook: Book): void {
    const books = this.getBooks();
    const index = books.findIndex((book) => book.id === updatedBook.id);

    if (index !== -1) {
      books[index] = updatedBook;
      this.bookStorage.save(books);
    }
  }

  private saveData(): void {
    this.bookStorage.save(this.getBooks());
    this.userStorage.save(this.getUsers());
  }
}
