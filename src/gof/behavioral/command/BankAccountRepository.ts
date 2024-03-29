import BankAccount from "./BankAccount";

export default interface BankAccountRepository {
	save (bankAccount: BankAccount): Promise<void>;
	update (bankAccount: BankAccount): Promise<void>;
	getById (bankAccountId: number): Promise<BankAccount>;
}

export class BankAccountRepositoryMemory implements BankAccountRepository {
	bankAccounts: BankAccount[];

	constructor () {
		this.bankAccounts = [];
	}

	async save(bankAccount: BankAccount): Promise<void> {
		this.bankAccounts.push(bankAccount);
	}

	async update(bankAccount: BankAccount): Promise<void> {
		const index = this.bankAccounts.findIndex((existingBankAccount: BankAccount) => existingBankAccount.bankAccountId === bankAccount.bankAccountId);
		this.bankAccounts.splice(index, 1);
		this.bankAccounts.push(bankAccount);
	}

	async getById(bankAccountId: number): Promise<BankAccount> {
		const bankAccount = this.bankAccounts.find((bankAccount: BankAccount) => bankAccount.bankAccountId === bankAccountId);
		if (!bankAccount) throw new Error("Bank account not found");
		return bankAccount;
	}

}
