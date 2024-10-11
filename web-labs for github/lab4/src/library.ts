// src/library.ts
export class Library {
  private books: string[] = [];

  // Метод для додавання книги
  addBook(book: string): void {
    this.books.push(book);
  }

  // Метод для отримання всіх книг
  getBooks(): string[] {
    return this.books;
  }

  // Метод для видалення книги
  removeBook(book: string): void {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
}
