import UserRepository, { UserRepositoryMemory } from "./UserRepository";

export default class Login {
	userRepository: UserRepository;

	constructor () {
		this.userRepository = UserRepositoryMemory.getInstance();
	}

	async execute (input: Input): Promise<Output> {
		const user = await this.userRepository.getByEmail(input.email);
		let success = false;
		if (user && user.passwordMatches(input.password)) {
			success = true;
		}
		return {
			success
		}
	}
}

type Input = {
	email: string,
	password: string
}

type Output = {
	success: boolean
}
