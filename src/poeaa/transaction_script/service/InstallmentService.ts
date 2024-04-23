import currency from "currency.js";
import { saveInstallment } from "../dao/InstallmentDAO";

export async function saveInstallmentsUsingSAC(loan: any) {
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
		saveInstallment({
			loanId: loan.loanId,
			installmentNumber,
			amount: amount.value,
			amortization: amortization.value,
			interest: interest.value,
			balance: balance.value
		});
		installmentNumber++;
	}
}

export async function saveInstallmentsUsingPrice(loan: any) {
	let balance = currency(loan.amount);
	const rate = (loan.rate / 100) / 12;
	let installmentNumber = 1;
	const formula = Math.pow((1 + rate), loan.installments);
	let installmentAmount = balance.multiply((formula * rate) / (formula - 1));
	while (balance.value > 2) {
		let interest = balance.multiply(rate);
		let amortization = installmentAmount.subtract(interest);
		balance = balance.subtract(amortization);
		if (balance.value < 2) balance = currency(0);
		saveInstallment({
			loanId: loan.loanId,
			installmentNumber,
			amount: installmentAmount.value,
			amortization: amortization.value,
			interest: interest.value,
			balance: balance.value
		});
		installmentNumber++;
	}
}
