"use strict";
// Клас Circle
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    scale(factor) {
        this.radius *= factor;
    }
}
// Клас Rectangle
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }
}
// Клас Triangle
class Triangle {
    constructor(base, height) {
        this.base = base;
        this.height = height;
    }
    getArea() {
        return (this.base * this.height) / 2;
    }
    getPerimeter() {
        // Припустимо, що це рівносторонній трикутник
        return 3 * this.base;
    }
    scale(factor) {
        this.base *= factor;
        this.height *= factor;
    }
}
// Масив фігур
let shapes = [
    new Circle(5),
    new Rectangle(10, 20),
    new Triangle(8, 6)
];
// Обчислення загальної площі та периметру
let totalArea = shapes.reduce((acc, shape) => acc + shape.getArea(), 0);
let totalPerimeter = shapes.reduce((acc, shape) => acc + shape.getPerimeter(), 0);
console.log(`Total Area: ${totalArea}`);
console.log(`Total Perimeter: ${totalPerimeter}`);
