import GenericIterator from "./GenericIterator";
import UTXO from "./UTXO";

export default class Wallet {
	utxos: UTXO[];

	constructor (readonly address: string) {
		this.utxos = [];
	}

	addUTXO (utxo: UTXO) {
		this.utxos.push(utxo);
	}

	removeUTXO (utxo: UTXO) {
		this.utxos.splice(this.utxos.indexOf(utxo), 1);
	}

	getBalance () {
		let balance = 0;
		const iterator = new GenericIterator(this.utxos);
		while (iterator.hasNext()) {
			const utxo = iterator.next();
			balance += utxo.amount;
		}
		return balance;
	}
}
