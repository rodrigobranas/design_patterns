import Password, { PasswordFactory } from "./Password";

export default abstract class Account {
	password: Password;

	constructor (readonly name: string, readonly email: string, readonly document: string, password: string, readonly passwordType: string) {
		if (!name.match(/.+ .+/g)) throw new Error("Invalid name");
		if (!email.match(/.+\@.+\..+/g)) throw new Error("Invalid email");
		if (document.length !== 11) throw new Error("Invalid document");
		this.password = PasswordFactory.create(passwordType, password);
	}

	passwordMatches (password: string): boolean {
		return this.password.passwordMatches(password);
	}
}
