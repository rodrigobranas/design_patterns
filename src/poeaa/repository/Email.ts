export default class Email {
	private value: string;

	constructor (email: string) {
		if (!email.match(/.+@.+.com/)) throw new Error("Invalid email");
		this.value = email;
	}

	getValue () {
		return this.value;
	}
}