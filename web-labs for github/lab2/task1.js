"use strict";
// Клас Cat, що імплементує інтерфейс Animal
class Cat {
    constructor(name) {
        this.sound = "meow";
        this.name = name;
    }
    move() {
        console.log(`${this.name} is walking.`);
    }
}
// Клас Bird, що імплементує інтерфейс Animal
class Bird {
    constructor(name) {
        this.sound = "chirp";
        this.name = name;
    }
    move() {
        console.log(`${this.name} is flying.`);
    }
}
// Клас Fish, що імплементує інтерфейс Animal
class Fish {
    constructor(name) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} is swimming.`);
    }
}
let cat = new Cat("Whiskers");
let bird = new Bird("Tweety");
let fish = new Fish("Goldie");
cat.move();
bird.move();
fish.move();
