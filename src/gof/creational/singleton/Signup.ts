import User from "./User";
import UserRepository, { UserRepositoryMemory } from "./UserRepository"

export default class Signup {
	userRepository: UserRepository;

	constructor () {
		this.userRepository = UserRepositoryMemory.getInstance();
	}

	async execute (input: Input): Promise<Output> {
		const user = User.create(input.name, input.email, input.password);
		await this.userRepository.save(user);
		return {
			userId: user.userId
		}
	}
}

type Input = {
	name: string,
	email: string,
	password: string
}

type Output = {
	userId: string
}
