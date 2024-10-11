
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void;
}


class Circle implements Shape {
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    scale(factor: number): void {
        this.radius *= factor;
    }
}


class Rectangle implements Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}


class Triangle implements Shape {
    base: number;
    height: number;

    constructor(base: number, height: number) {
        this.base = base;
        this.height = height;
    }

    getArea(): number {
        return (this.base * this.height) / 2;
    }

    getPerimeter(): number {
        // Припустимо, що це рівносторонній трикутник
        return 3 * this.base;
    }

    scale(factor: number): void {
        this.base *= factor;
        this.height *= factor;
    }
}


let shapes: Shape[] = [
    new Circle(5),
    new Rectangle(10, 20),
    new Triangle(8, 6)
];

// Обчислення загальної площі та периметру
let totalArea = shapes.reduce((acc, shape) => acc + shape.getArea(), 0);
let totalPerimeter = shapes.reduce((acc, shape) => acc + shape.getPerimeter(), 0);

console.log(`Total Area: ${totalArea}`);
console.log(`Total Perimeter: ${totalPerimeter}`);
