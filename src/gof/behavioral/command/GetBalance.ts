import BankAccountRepository from "./BankAccountRepository"

export default class GetBalance {

	constructor (readonly bankAccountRepository: BankAccountRepository) {
	}

	async execute (bankAccountId: number): Promise<Output> {
		const bankAccount = await this.bankAccountRepository.getById(bankAccountId);
		return {
			balance: bankAccount.getBalance()
		}
	}
}

type Output = {
	balance: number
}