import Installment from "./Installment";
import Loan from "./Loan";
import currency from "currency.js";

export default interface InstallmentCalculator {
	calculate (loan: Loan): Installment[];
}

export class SACInstallmentCalculator implements InstallmentCalculator {

	calculate(loan: Loan): Installment[] {
		const installments: Installment[] = [];
		let balance = currency(loan.amount);
		let rate = (loan.rate / 100) / 12;
		let installmentNumber = 1;
		let amortization = currency(balance.value / loan.installments);
		while (balance.value > 0.10) {
			let saldoInicial = currency(balance.value);
			let interest = currency(saldoInicial.value * rate);
			let updatedBalance = currency(saldoInicial.value + interest.value);
			let amount = currency(interest.value + amortization.value);
			balance = currency(updatedBalance.value - amount.value);
			if (balance.value <= 0.10) balance = currency(0);
			installments.push(new Installment(
				installmentNumber,
				amount.value, 
				interest.value, 
				amortization.value, 
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
		let rate = (loan.rate / 100) / 12;
		let installmentNumber = 1;
		let formula = Math.pow((1 + rate), loan.installments);
		let amount = balance.multiply((formula * rate) / (formula - 1));
		while (balance.value > 0.10) {
			let interest = balance.multiply(rate);
			let amortization = amount.subtract(interest);
			balance = balance.subtract(amortization);
			if (balance.value <= 0.10) balance = currency(0);
			installments.push(new Installment(
				installmentNumber,
				amount.value, 
				interest.value, 
				amortization.value, 
				balance.value
			));
			installmentNumber++;
		}
		return installments;
	}

}
