import InstallmentCalculator, { PriceInstallmentCalculator, SACInstallmentCalculator } from "./InstallmentCalculator";
import Loan, { CarLoan, EducationLoan, MortgageLoan } from "./Loan";

export default interface LoanFactory {
	createLoan (amount: number, income: number, installments: number): Loan;
	createInstallmentCalculator (): InstallmentCalculator;
}

export class MortgageLoanFactory implements LoanFactory {

	createLoan(amount: number, income: number, installments: number): Loan {
		return new MortgageLoan(amount, income, installments);
	}
	createInstallmentCalculator(): InstallmentCalculator {
		return new SACInstallmentCalculator();
	}

}

export class CarLoanFactory implements LoanFactory {

	createLoan(amount: number, income: number, installments: number): Loan {
		return new CarLoan(amount, income, installments);
	}
	createInstallmentCalculator(): InstallmentCalculator {
		return new PriceInstallmentCalculator();
	}

}

export class EducationLoanFactory implements LoanFactory {

	createLoan(amount: number, income: number, installments: number): Loan {
		return new EducationLoan(amount, income, installments);
	}
	createInstallmentCalculator(): InstallmentCalculator {
		return new PriceInstallmentCalculator();
	}

}
