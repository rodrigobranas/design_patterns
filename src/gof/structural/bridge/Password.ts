import crypto from "crypto";

export default interface Password {
	value: string;
	passwordMatches (password: string): boolean;
}

export class PasswordPlainText implements Password {
	value: string;

	constructor (password: string) {
		this.value = password;
	}
	
	passwordMatches(password: string): boolean {
		return this.value === password;
	}

}

export class PasswordSHA1 implements Password {
	value: string;

	constructor (password: string) {
		this.value = crypto.createHash("sha1").update(password).digest("hex");
	}
	
	passwordMatches(password: string): boolean {
		return this.value === crypto.createHash("sha1").update(password).digest("hex");
	}

}

export class PasswordFactory {
	static create (type: string, password: string) {
		if (type === "plaintext") return new PasswordPlainText(password);
		if (type === "sha1") return new PasswordSHA1(password);
		throw new Error("Invalid password type");
	}
}
