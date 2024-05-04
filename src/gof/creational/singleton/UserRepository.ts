import User from "./User";

export default interface UserRepository {
	save (user: User): Promise<void>;
	getById (userId: string): Promise<User>;
	getByEmail (email: string): Promise<User>;
}

export class UserRepositoryMemory implements UserRepository {
	users: User[];
	static instance: UserRepositoryMemory;

	private constructor () {
		this.users = [];
	}

	async save(user: User): Promise<void> {
		this.users.push(user);
	}

	async getById(userId: string): Promise<User> {
		const user = this.users.find((user: User) => user.userId === userId);
		if (!user) throw new Error("User not found");
		return user;
	}

	async getByEmail(email: string): Promise<User> {
		const user = this.users.find((user: User) => user.email === email);
		if (!user) throw new Error("User not found");
		return user;
	}

	static getInstance () {
		if (!UserRepositoryMemory.instance) {
			UserRepositoryMemory.instance = new UserRepositoryMemory();
		}
		return UserRepositoryMemory.instance;
	}

}
