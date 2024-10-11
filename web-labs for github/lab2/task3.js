"use strict";
// Абстрактний клас Car
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
}
// Клас Ford
class Ford extends Car {
    constructor(model) {
        super("Ford", model);
    }
    displayDetails() {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}
// Клас Toyota
class Toyota extends Car {
    constructor(model) {
        super("Toyota", model);
    }
    displayDetails() {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}
// Клас BMW
class BMW extends Car {
    constructor(model) {
        super("BMW", model);
    }
    displayDetails() {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}
// Створення екземплярів класів
let fordFocus = new Ford("Focus");
let toyotaCamry = new Toyota("Camry");
let bmwX5 = new BMW("X5");
fordFocus.displayDetails();
toyotaCamry.displayDetails();
bmwX5.displayDetails();
