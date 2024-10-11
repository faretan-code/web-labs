"use strict";
// Абстрактний клас Employee
class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
// Клас Developer
class Developer extends Employee {
    getAnnualBonus() {
        return this.salary * 0.1;
    }
    pay() {
        console.log(`${this.name} has been paid.`);
    }
}
// Клас Manager
class Manager extends Employee {
    getAnnualBonus() {
        return this.salary * 0.2;
    }
    pay() {
        console.log(`${this.name} has been paid.`);
    }
}
// Масив співробітників
let employees = [
    new Developer("John", 28, 50000),
    new Manager("Sarah", 35, 70000)
];
// Підрахунок загальної суми бонусів
let totalBonus = employees.reduce((acc, employee) => acc + employee.getAnnualBonus(), 0);
console.log(`Total Annual Bonus: ${totalBonus}`);
