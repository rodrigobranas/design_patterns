import Email from "./Email";
import Password from "./Password";

export default class User {
	private status: "active" | "blocked";
	private password: Password;
	private email: Email;

	constructor (private name: string, email: string, password: string) {
		this.password = new Password(password);
		this.email = new Email(email);
		this.status = "active";
	}

	updatePassword (password: string) {
		this.password = new Password(password);
	}

	updateEmail (email: string) {
		this.email = new Email(email);
	}

	block () {
		if (this.status === "blocked") throw new Error("User is already blocked");
		this.status = "blocked";
	}

	getName () {
		return this.name;
	}

	getEmail () {
		return this.email.getValue();
	}

	getPassword () {
		return this.password.getValue();
	}

	getStatus () {
		return this.status;
	}
}
