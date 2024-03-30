import Grade from "./Grade";
import pgp from "pg-promise";

export default interface GradeRepository {
	save (grade: Grade): Promise<void>;
	listByStudentId (studentId: number): Promise<Grade[]>;
}

export class GradeRepositoryDatabase implements GradeRepository {

	async save(grade: Grade): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into design_patterns.grade (student_id, exam, value) values ($1, $2, $3)", [grade.studentId, grade.exam, grade.value]);
		await connection.$pool.end();
	}

	async listByStudentId(studentId: number): Promise<Grade[]> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const gradesData = await connection.query("select * from design_patterns.grade where student_id = $1", [studentId]);
		await connection.$pool.end();
		const grades = [];
		for (const gradeData of gradesData) {
			grades.push(new Grade(gradeData.student_id, gradeData.exam, parseFloat(gradeData.value)));
		}
		return grades;
	}

}
