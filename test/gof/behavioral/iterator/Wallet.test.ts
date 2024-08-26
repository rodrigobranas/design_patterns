import State from "../../../../src/gof/behavioral/iterator/State";
import UTXO from "../../../../src/gof/behavioral/iterator/UTXO";
import Wallet from "../../../../src/gof/behavioral/iterator/Wallet";

test("Deve transferir de uma carteira para a outra", function () {
	const wallet1 = new Wallet("alice");
	const wallet2 = new Wallet("bob");
	wallet1.addUTXO(new UTXO(10));
	wallet1.addUTXO(new UTXO(2));
	wallet2.addUTXO(new UTXO(1));
	wallet2.addUTXO(new UTXO(1));
	const state = new State();
	state.addWallet(wallet1);
	state.addWallet(wallet2);
	expect(wallet1.getBalance()).toBe(12);
	expect(wallet2.getBalance()).toBe(2);
	state.transfer("alice", "bob", 5);
	expect(wallet1.getBalance()).toBe(7);
	expect(wallet1.utxos[0].amount).toBe(2);
	expect(wallet1.utxos[1].amount).toBe(5);
	expect(wallet2.getBalance()).toBe(7);
	expect(wallet2.utxos[0].amount).toBe(1);
	expect(wallet2.utxos[1].amount).toBe(1);
	expect(wallet2.utxos[2].amount).toBe(5);
	expect(() => state.transfer("alice", "bob", 10)).toThrow(new Error("Insuficient funds"));
});
