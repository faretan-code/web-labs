"use strict";
// Клас OnlineCourse
class OnlineCourse {
    constructor(name, duration) {
        this.students = [];
        this.name = name;
        this.duration = duration;
    }
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
        }
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
}
// Клас CourseManager
class CourseManager {
    constructor() {
        this.courses = [];
    }
    addCourse(course) {
        this.courses.push(course);
    }
    removeCourse(courseName) {
        this.courses = this.courses.filter(course => course.name !== courseName);
    }
    findCourse(courseName) {
        return this.courses.find(course => course.name === courseName);
    }
    listCourses() {
        this.courses.forEach(course => {
            console.log(`Course: ${course.name}, Students: ${course.students.join(", ")}`);
        });
    }
}
// Тестування
let courseManager = new CourseManager();
let math = new OnlineCourse("Mathematics", 40);
let physics = new OnlineCourse("Physics", 35);
courseManager.addCourse(math);
courseManager.addCourse(physics);
math.registerStudent("Alice");
physics.registerStudent("Bob");
courseManager.listCourses();
