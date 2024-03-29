export default class Password {
	private value: string;

	constructor (password: string) {
		if (password.length < 8) throw new Error("Minimum length is 8");
		this.value = password;
	}

	getValue () {
		return this.value;
	}
}