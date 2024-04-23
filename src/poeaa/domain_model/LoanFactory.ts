import InstallmentCalculator, { PriceInstallmentCalculator, SACInstallmentCalculator } from "./InstallmentCalculator";
import Loan, { CarLoan, MortgageLoan } from "./Loan";

export default interface LoanFactory {
	createLoan(amount: number, income: number, installments: number): Loan;
	createInstallmentCalculator(): InstallmentCalculator;
}

export class MortgageLoanFactory implements LoanFactory {

	createLoan(amount: number, income: number, installments: number): MortgageLoan {
		return MortgageLoan.create(amount, income, installments);
	}

	createInstallmentCalculator(): InstallmentCalculator {
		return new SACInstallmentCalculator();
	}

}

export class CarLoanFactory implements LoanFactory {

	createLoan(amount: number, income: number, installments: number): MortgageLoan {
		return CarLoan.create(amount, income, installments);
	}

	createInstallmentCalculator(): InstallmentCalculator {
		return new PriceInstallmentCalculator();
	}

}
