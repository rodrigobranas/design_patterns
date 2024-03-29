import BankAccount from "../../../../src/gof/behavioral/command/BankAccount";
import TransferCommand from "../../../../src/gof/behavioral/command/TransferCommand";

test("Deve fazer uma transferência entre duas contas", function () {
	const from = new BankAccount(1);
	const to = new BankAccount(2);
	expect(from.getBalance()).toBe(0);
	expect(to.getBalance()).toBe(0);
	from.debit(100);
	to.credit(100);
	expect(from.getBalance()).toBe(-100);
	expect(to.getBalance()).toBe(100);
});

test("Deve fazer uma transferência entre duas contas usando um comando", function () {
	const from = new BankAccount(1);
	const to = new BankAccount(2);
	expect(from.getBalance()).toBe(0);
	expect(to.getBalance()).toBe(0);
	const transferCommand = new TransferCommand(from, to, 100);
	transferCommand.execute();
	expect(from.getBalance()).toBe(-100);
	expect(to.getBalance()).toBe(100);
});
