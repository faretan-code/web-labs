
abstract class Employee {
    protected name: string;
    protected age: number;
    protected salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    abstract getAnnualBonus(): number;
}


interface Payable {
    pay(): void;
}


class Developer extends Employee implements Payable {
    getAnnualBonus(): number {
        return this.salary * 0.1;
    }

    pay(): void {
        console.log(`${this.name} has been paid.`);
    }
}


class Manager extends Employee implements Payable {
    getAnnualBonus(): number {
        return this.salary * 0.2;
    }

    pay(): void {
        console.log(`${this.name} has been paid.`);
    }
}


let employees: Employee[] = [
    new Developer("John", 28, 50000),
    new Manager("Sarah", 35, 70000)
];

// Підрахунок загальної суми бонусів
let totalBonus = employees.reduce((acc, employee) => acc + employee.getAnnualBonus(), 0);
console.log(`Total Annual Bonus: ${totalBonus}`);
