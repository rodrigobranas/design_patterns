import crypto from "crypto";

export default class User {

	constructor (readonly userId: string, readonly name: string, readonly email: string, readonly password: string) {
	}

	static create (name: string, email: string, password: string) {
		const userId = crypto.randomUUID();
		return new User(userId, name, email, password);
	}

	passwordMatches (password: string) {
		return this.password === password;
	}
}
