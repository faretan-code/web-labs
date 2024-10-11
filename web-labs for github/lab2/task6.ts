
interface LibraryItem {
    title: string;
    author: string;
    borrowed: boolean;
    borrow(): void;
}


class Book implements LibraryItem {
    title: string;
    author: string;
    pages: number;
    borrowed: boolean = false;

    constructor(title: string, author: string, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    borrow(): void {
        this.borrowed = true;
    }
}

// Клас Magazine
class Magazine implements LibraryItem {
    title: string;
    author: string;
    issueNumber: number;
    borrowed: boolean = false;

    constructor(title: string, author: string, issueNumber: number) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }

    borrow(): void {
        this.borrowed = true;
    }
}

// Клас DVD
class DVD implements LibraryItem {
    title: string;
    author: string;
    duration: number;
    borrowed: boolean = false;

    constructor(title: string, author: string, duration: number) {
        this.title = title;
        this.author = author;
        this.duration = duration;
    }

    borrow(): void {
        this.borrowed = true;
    }
}


class Library {
    private items: LibraryItem[] = [];

    addItem(item: LibraryItem): void {
        this.items.push(item);
    }

    listAvailableItems(): void {
        this.items.forEach(item => {
            if (!item.borrowed) {
                console.log(`Available: ${item.title}`);
            }
        });
    }
}


let library = new Library();

let book = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);
let magazine = new Magazine("National Geographic", "Various", 12);
let dvd = new DVD("Inception", "Christopher Nolan", 148);

library.addItem(book);
library.addItem(magazine);
library.addItem(dvd);

book.borrow();

library.listAvailableItems();
