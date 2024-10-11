import { Book } from './book';

export class User {
    borrowedBooks: Book[] = [];

    constructor(
        public id: number,
        public name: string,
        public email: string
    ) {}
}
