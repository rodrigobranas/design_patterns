import LoanFactory from "./LoanFactory";

export default class SimulateLoan {

	constructor (readonly loanFactory: LoanFactory) {
	}

	execute (input: Input): Output {
		const loan = this.loanFactory.createLoan(input.amount, input.income, input.installments);
		const installmentCalculator = this.loanFactory.createInstallmentCalculator();
		const installments = installmentCalculator.calculate(loan);
		return {
			installments
		};
	}
}

type Input = {
	amount: number,
	income: number,
	installments: number
}

type Output = {
	installments: { number: number, amount: number, interest: number, amortization: number, balance: number }[]
}