import UserRepository, { UserRepositoryMemory } from "./UserRepository"

export default class Login {
	userRepository: UserRepository;

	constructor () {
		this.userRepository = UserRepositoryMemory.getInstance();
	}

	async execute (input: Input): Promise<Output> {
		const user = await this.userRepository.getByEmail(input.email);
		const isValid = user.isValid(input.password);
		return {
			isValid
		};
	}
}

type Input = {
	email: string,
	password: string
}

type Output = {
	isValid: boolean
}
