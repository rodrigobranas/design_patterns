import Average from "./Average";
import AverageRepository from "./AverageRepository";
import GradeRepository from "./GradeRepository";

export default class CalculateAverage {

	constructor (readonly gradeRepository: GradeRepository, readonly averageRepository: AverageRepository) {
	}

	async execute (studentId: number): Promise<void> {
		const grades = await this.gradeRepository.listByStudentId(studentId);
		let total = 0;
		for (const grade of grades) {
			total += grade.value;
		}
		const value = total/grades.length;
		const average = new Average(studentId, value);
		await this.averageRepository.save(average);
	}
}