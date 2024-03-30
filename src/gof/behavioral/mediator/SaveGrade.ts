import CalculateAverage from "./CalculateAverage";
import Grade from "./Grade";
import GradeRepository from "./GradeRepository";

export default class SaveGrade {

	constructor (readonly gradeRepository: GradeRepository, readonly calculateAverage: CalculateAverage) {
	}

	async execute (input: Input): Promise<void> {
		const grade = new Grade(input.studentId, input.exam, input.value);
		await this.gradeRepository.save(grade);
		await this.calculateAverage.execute(input.studentId);
	}
}

type Input = {
	studentId: number,
	exam: string,
	value: number
}
