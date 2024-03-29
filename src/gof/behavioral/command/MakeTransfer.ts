import BankAccountRepository from "./BankAccountRepository"
import TransferCommand from "./TransferCommand";

export default class MakeTransfer {

	constructor (readonly bankAccountRepository: BankAccountRepository) {
	}

	async execute (input: Input): Promise<void> {
		const from = await this.bankAccountRepository.getById(input.fromBankAccountId);
		const to = await this.bankAccountRepository.getById(input.toBankAccountId);
		const transferCommand = new TransferCommand(from, to, input.amount);
		transferCommand.execute();
		await this.bankAccountRepository.update(from);
		await this.bankAccountRepository.update(to);
	}
}

type Input = {
	fromBankAccountId: number,
	toBankAccountId: number,
	amount: number
}
