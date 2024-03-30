import Average from "./Average";
import pgp from "pg-promise";

export default interface AverageRepository {
	save (average: Average): Promise<void>;
	getByStudentId (studentId: number): Promise<Average>;
}

export class AverageRepositoryDatabase implements AverageRepository {

	async save(average: Average): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("delete from design_patterns.average where student_id = $1", [average.studentId]);
		await connection.query("insert into design_patterns.average (student_id, value) values ($1, $2)", [average.studentId, average.value]);
		await connection.$pool.end();
	}

	async getByStudentId(studentId: number): Promise<Average> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [averageData] = await connection.query("select * from design_patterns.average where student_id = $1", [studentId]);
		await connection.$pool.end();
		return new Average(averageData.student_id, parseFloat(averageData.value));
	}

}
