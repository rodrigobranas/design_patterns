export default abstract class Loan {
	abstract rate: number;

	constructor (readonly amount: number, readonly income: number, readonly installments: number, readonly type: string) {
	}
}

export class MortgageLoan extends Loan {
	rate = 10;

	constructor (amount: number, income: number, installments: number) {
		super(amount, income, installments, "mortgage");
		if (installments > 420) throw new Error("Maximum number of installments for mortgage loan is 420");
		if ((income * 0.25) < amount/installments) throw new Error("The installment cannot exceed 25% of the monthly income");
	}
}

export class CarLoan extends Loan {
	rate = 15;

	constructor (amount: number, income: number, installments: number) {
		super(amount, income, installments, "car");
		if (installments > 60) throw new Error("Maximum number of installments for car loan is 60");
		if ((income * 0.30) < amount/installments) throw new Error("The installment cannot exceed 30% of the monthly income");
	}
}

export class EducationLoan extends Loan {
	rate = 0.1;

	constructor (amount: number, income: number, installments: number) {
		super(amount, income, installments, "education");
		if (installments > 120) throw new Error("Maximum number of installments for education loan is 120");
		if ((income * 0.50) < amount/installments) throw new Error("The installment cannot exceed 50% of the monthly income");
	}
}
