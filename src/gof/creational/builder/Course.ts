export class Course {
	subjects: Subject[];

	constructor (readonly name: string, readonly workload: number) {
		this.subjects = [];
	}

	addSubject (subject: Subject) {
		this.subjects.push(subject);
	}
}

export class Subject {

	constructor (readonly area: string, readonly code: string, readonly name: string, readonly workload: number) {
	}
}
