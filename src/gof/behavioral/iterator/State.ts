import UTXO from "./UTXO";
import Wallet from "./Wallet";

export default class State {
	wallets: { [address: string]: Wallet };

	constructor () {
		this.wallets = {};
	}

	addWallet (wallet: Wallet) {
		this.wallets[wallet.address] = wallet;
	}

	transfer (from: string, to: string, amount: number) {
		const walletFrom = this.wallets[from];
		const walletTo = this.wallets[to];
		let totalUtxos = 0;
		if (walletFrom.getBalance() < amount) throw new Error("Insuficient funds");
		for (const utxo of walletFrom.utxos) {
			totalUtxos += utxo.amount;
			walletFrom.removeUTXO(utxo);
			if (totalUtxos >= amount) break;
		}
		const remaining = totalUtxos - amount;
		if (remaining < 0) throw new Error("Double spend transaction detected");
		walletFrom.addUTXO(new UTXO(remaining));
		walletTo.addUTXO(new UTXO(amount));
	}
}
