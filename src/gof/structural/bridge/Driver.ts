import Account from "./Account";


export default class Driver extends Account {

	constructor (name: string, email: string, document: string, readonly carPlate: string, password: string, passwordType: string = "plaintext") {
		super(name, email, document, password, passwordType);
		if (!carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid car plate");
	}
}
