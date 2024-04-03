import InstallmentRepository from "./InstallmentRepository";
import LoanFactory from "./LoanFactory";
import LoanRepository from "./LoanRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class GetLoan {
	loanRepository: LoanRepository;
	installmentRepository: InstallmentRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.loanRepository = repositoryFactory.createLoanRepository();
		this.installmentRepository = repositoryFactory.createInstallmentRepository();
	}

	async execute (input: Input): Promise<Output> {
		const loan = await this.loanRepository.get(input.loanId);
		const installments = await this.installmentRepository.listByLoanId(input.loanId);
		const output: Output = {
			loanId: loan.loanId,
			amount: loan.amount,
			installments: []
		}
		for (const installment of installments) {
			output.installments.push({ 
				number: installment.number, 
				amount: installment.amount,
				interest: installment.interest,
				amortization: installment.amortization,
				balance: installment.balance
			});
		}
		return output;
	}
}

type Input = {
	loanId: string
}

type Output = {
	loanId: string,
	amount: number,
	installments: { number: number, amount: number, interest: number, amortization: number, balance: number }[]
}
