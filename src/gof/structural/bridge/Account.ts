import crypto from "crypto";

export default abstract class Account {

	constructor (readonly type: string, readonly name: string, readonly email: string, readonly password: string) {
	}

	abstract passwordMatches (password: string): boolean;
}

export abstract class Passenger extends Account {
	creditCardToken: string;

	constructor (name: string, email: string, password: string, creditCardToken: string) {
		super("passenger", name, email, password);
		this.creditCardToken = creditCardToken;
	}

	abstract passwordMatches (password: string): boolean;
}

export abstract class Driver extends Account {
	carPlate: string;
	
	constructor (name: string, email: string, password: string, carPlate: string) {
		super("driver", name, email, password);
		this.carPlate = carPlate;
	}

	abstract passwordMatches (password: string): boolean;
}

export class PassengerPasswordPlain extends Passenger {

	constructor (name: string, email: string, password: string, creditCardToken: string) {
		super(name, email, password, creditCardToken);
	}

	passwordMatches (password: string): boolean {
		return this.password === password;
	}
}

export class PassengerPasswordSHA1 extends Passenger {

	constructor (name: string, email: string, password: string, creditCardToken: string) {
		const sha1 = crypto.createHash("sha1").update(password).digest("hex");
		super(name, email, sha1, creditCardToken);
	}

	passwordMatches (password: string): boolean {
		const sha1 = crypto.createHash("sha1").update(password).digest("hex");
		return this.password === sha1;
	}
}
