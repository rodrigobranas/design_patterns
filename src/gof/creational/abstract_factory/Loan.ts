import crypto from "crypto";

export default abstract class Loan {
	abstract rate: number;

	constructor (readonly loanId: string, readonly amount: number, readonly income: number, readonly installments: number, readonly type: string) {
	}

	static create (amount: number, income: number, installments: number): Loan {
		throw new Error("This method is abstract");
	};
}

export class MortgageLoan extends Loan {
	rate = 10;

	constructor (loanId: string, amount: number, income: number, installments: number) {
		super(loanId, amount, income, installments, "mortgage");
		if (installments > 420) throw new Error("Maximum number of installments for mortgage loan is 420");
		if ((income * 0.25) < amount/installments) throw new Error("The installment cannot exceed 25% of the monthly income");
	}
	
	static create (amount: number, income: number, installments: number) {
		const loanId = crypto.randomUUID();
		return new MortgageLoan(loanId, amount, income, installments);
	}
}

export class CarLoan extends Loan {
	rate = 15;

	constructor (loanId: string, amount: number, income: number, installments: number) {
		super(loanId, amount, income, installments, "car");
		if (installments > 60) throw new Error("Maximum number of installments for car loan is 60");
		if ((income * 0.30) < amount/installments) throw new Error("The installment cannot exceed 30% of the monthly income");
	}

	static create (amount: number, income: number, installments: number) {
		const loanId = crypto.randomUUID();
		return new CarLoan(loanId, amount, income, installments);
	}
}

export class EducationLoan extends Loan {
	rate = 0.1;

	constructor (loanId: string, amount: number, income: number, installments: number) {
		super(loanId, amount, income, installments, "education");
		if (installments > 120) throw new Error("Maximum number of installments for education loan is 120");
		if ((income * 0.50) < amount/installments) throw new Error("The installment cannot exceed 50% of the monthly income");
	}

	static create (amount: number, income: number, installments: number) {
		const loanId = crypto.randomUUID();
		return new EducationLoan(loanId, amount, income, installments);
	}
}
