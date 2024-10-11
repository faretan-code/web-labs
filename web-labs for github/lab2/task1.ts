
interface Animal {
    name: string;
    move(): void;
    sound?: string;
}


class Cat implements Animal {
    name: string;
    sound = "meow";
    constructor(name: string) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} is walking.`);
    }
}


class Bird implements Animal {
    name: string;
    sound = "chirp";
    constructor(name: string) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} is flying.`);
    }
}


class Fish implements Animal {
    name: string;
    constructor(name: string) {
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
