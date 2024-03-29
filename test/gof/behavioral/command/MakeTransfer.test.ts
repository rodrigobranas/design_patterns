import BankAccount from "../../../../src/gof/behavioral/command/BankAccount";
import { BankAccountRepositoryMemory } from "../../../../src/gof/behavioral/command/BankAccountRepository";
import GetBalance from "../../../../src/gof/behavioral/command/GetBalance";
import MakeTransfer from "../../../../src/gof/behavioral/command/MakeTransfer";

test("Deve fazer uma transferência bancária", async function () {
	const bankAccountRepository = new BankAccountRepositoryMemory();
	bankAccountRepository.save(new BankAccount(1));
	bankAccountRepository.save(new BankAccount(2));
	const makeTransfer = new MakeTransfer(bankAccountRepository);
	const input = {
		fromBankAccountId: 1,
		toBankAccountId: 2,
		amount: 100
	};
	await makeTransfer.execute(input);
	const getBalance = new GetBalance(bankAccountRepository);
	const outputA = await getBalance.execute(1);
	expect(outputA.balance).toBe(-100);
	const outputB = await getBalance.execute(2);
	expect(outputB.balance).toBe(100);
});
