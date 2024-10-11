
abstract class Car {
    protected make: string;
    protected model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }

    abstract displayDetails(): void;
}


class Ford extends Car {
    constructor(model: string) {
        super("Ford", model);
    }

    displayDetails(): void {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}


class Toyota extends Car {
    constructor(model: string) {
        super("Toyota", model);
    }

    displayDetails(): void {
        console.log(`Car: ${this.make} ${this.model}`);
    }
}

// Клас BMW
class BMW extends Car {
    constructor(model: string) {
        super("BMW", model);
    }

    displayDetails(): void {
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
