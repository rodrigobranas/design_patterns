import User from "./User";
import pgp from "pg-promise";

export default interface UserRepository {
	save (user: User): Promise<void>;
	update (user: User): Promise<void>;
	delete (email: string): Promise<void>;
	list (): Promise<User[]>;
	getByEmail (email: string): Promise<User>;
}

export class UserRepositoryDatabase implements UserRepository {

	async save(user: User): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into design_patterns.user (name, email, password, status) values ($1, $2, $3, $4)", [user.getName(), user.getEmail(), user.getPassword(), user.getStatus()]);
		await connection.$pool.end();
	}

	async update(user: User): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("update design_patterns.user set name = $1, password = $2, status = $3 where email = $4", [user.getName(), user.getPassword(), user.getStatus(), user.getEmail()]);
		await connection.$pool.end();	
	}

	async delete(email: string): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("delete from design_patterns.user where email = $1", [email]);
		await connection.$pool.end();	
	}

	async list(): Promise<User[]> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const usersData = await connection.query("select * from design_patterns.user", []);
		await connection.$pool.end();
		const users = [];
		for (const userData of usersData) {
			const user = new User(userData.name, userData.email, userData.password);
			users.push(user);
		}
		return users;
	}

	async getByEmail(email: string): Promise<User> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [userData] = await connection.query("select * from design_patterns.user where email = $1", [email]);
		if (!userData) throw new Error("User not found");
		const user = new User(userData.name, userData.email, userData.password);
		await connection.$pool.end();	
		return user;
	}

}
