
interface Course {
    name: string;
    duration: number;
    students: string[];
}


class OnlineCourse implements Course {
    name: string;
    duration: number;
    students: string[] = [];

    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }

    registerStudent(student: string): void {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
        }
    }

    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }
}


class CourseManager {
    private courses: Course[] = [];

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    removeCourse(courseName: string): void {
        this.courses = this.courses.filter(course => course.name !== courseName);
    }

    findCourse(courseName: string): Course | undefined {
        return this.courses.find(course => course.name === courseName);
    }

    listCourses(): void {
        this.courses.forEach(course => {
            console.log(`Course: ${course.name}, Students: ${course.students.join(", ")}`);
        });
    }
}


let courseManager = new CourseManager();
let math = new OnlineCourse("Mathematics", 40);
let physics = new OnlineCourse("Physics", 35);

courseManager.addCourse(math);
courseManager.addCourse(physics);

math.registerStudent("Alice");
physics.registerStudent("Bob");

courseManager.listCourses();
