import crypto from "crypto";

export default abstract class Account {
	password: Password;

	constructor (readonly type: string, readonly name: string, readonly email: string, password: string, passwordType: string) {
		this.password = PasswordFactory.create(passwordType, password);
	}

	passwordMatches (password: string): boolean {
		return this.password.passwordMatches(password);
	}
}

export abstract class Passenger extends Account {
	creditCardToken: string;

	constructor (name: string, email: string, password: string, passwordType: string, creditCardToken: string) {
		super("passenger", name, email, password, passwordType);
		this.creditCardToken = creditCardToken;
	}
}

export abstract class Driver extends Account {
	carPlate: string;
	
	constructor (name: string, email: string, password: string, passwordType: string, carPlate: string) {
		super("driver", name, email, password, passwordType);
		this.carPlate = carPlate;
	}
}

export interface Password {
	value: string;
	passwordMatches (password: string): boolean;
}

export class Plain implements Password {
	value: string;

	constructor (password: string) {
		this.value = password;
	}

	passwordMatches (password: string): boolean {
		return this.value === password;
	}
}

export class SHA1 implements Password {
	value: string;

	constructor (password: string) {
		this.value = crypto.createHash("sha1").update(password).digest("hex");
	}

	passwordMatches (password: string): boolean {
		const sha1 = crypto.createHash("sha1").update(password).digest("hex");
		return this.value === sha1;
	}
}

export class PasswordFactory {
	static create (type: string, password: string) {
		if (type === "plain") return new Plain(password);
		if (type === "sha1") return new SHA1(password);
		throw new Error();
	}
}
