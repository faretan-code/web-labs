"use strict";
// Клас Book
class Book {
    constructor(title, author, pages) {
        this.borrowed = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    borrow() {
        this.borrowed = true;
    }
}
// Клас Magazine
class Magazine {
    constructor(title, author, issueNumber) {
        this.borrowed = false;
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }
    borrow() {
        this.borrowed = true;
    }
}
// Клас DVD
class DVD {
    constructor(title, author, duration) {
        this.borrowed = false;
        this.title = title;
        this.author = author;
        this.duration = duration;
    }
    borrow() {
        this.borrowed = true;
    }
}
// Клас Library
class Library {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    listAvailableItems() {
        this.items.forEach(item => {
            if (!item.borrowed) {
                console.log(`Available: ${item.title}`);
            }
        });
    }
}
// Тестування
let library = new Library();
let book = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);
let magazine = new Magazine("National Geographic", "Various", 12);
let dvd = new DVD("Inception", "Christopher Nolan", 148);
library.addItem(book);
library.addItem(magazine);
library.addItem(dvd);
book.borrow();
library.listAvailableItems();
