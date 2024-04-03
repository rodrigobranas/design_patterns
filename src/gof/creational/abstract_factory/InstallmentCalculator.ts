import currency from "currency.js";
import Installment from "./Installment";
import Loan from "./Loan";

export default interface InstallmentCalculator {
	calculate (loan: Loan): Installment[];
}

export class SACInstallmentCalculator implements InstallmentCalculator {

	calculate(loan: Loan): Installment[] {
		const installments: Installment[] = [];
		let balance = currency(loan.amount);
		const rate = (loan.rate / 100) / 12;
		let installmentNumber = 1;
		let amortization = currency(balance.value / loan.installments);
		while (balance.value > 0.10) {
			let interest = currency(balance.value * rate);
			let updatedBalance = currency(balance.value + interest.value);
			let amount = currency(interest.value + amortization.value);
			balance = currency(updatedBalance.value - amount.value);
			if (balance.value < 0.10) balance = currency(0);
			installments.push(new Installment(
				loan.loanId,
				installmentNumber,
				amount.value,
				amortization.value,
				interest.value,
				balance.value
			));
			installmentNumber++;
		}
		return installments;
	}

}

export class PriceInstallmentCalculator implements InstallmentCalculator {

	calculate(loan: Loan): Installment[] {
		const installments: Installment[] = [];
		let balance = currency(loan.amount);
		const rate = (loan.rate / 100) / 12;
		let installmentNumber = 1;
		const formula = Math.pow((1 + rate), loan.installments);
		let amount = balance.multiply((formula * rate) / (formula - 1));
		while (balance.value > 2) {
			let interest = balance.multiply(rate);
			let amortization = amount.subtract(interest);
			balance = balance.subtract(amortization);
			if (balance.value < 2) balance = currency(0);
			installments.push(new Installment(
				loan.loanId,
				installmentNumber,
				amount.value,
				amortization.value,
				interest.value,
				balance.value
			));
			installmentNumber++;
		}
		return installments;
	}

}
