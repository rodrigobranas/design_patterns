import crypto from "crypto";

export default class UTXO {
	id: string;

	constructor (readonly amount: number) {
		this.id = crypto.randomUUID();
	}
}
