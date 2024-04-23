import { saveLoan } from "../dao/LoanDAO";
import { saveInstallmentsUsingSAC, saveInstallmentsUsingPrice } from "./InstallmentService";
import Loan from "./Loan";

export default class LoanService {

	async applyForLoan (loan: Loan) {
		loan.loanId = crypto.randomUUID();
		if (loan.type === "mortgage") {
			if (loan.installments > 420) throw new Error("The maximum number of installments for mortgage loan is 420");
			if ((loan.income * 0.25) < loan.amount/loan.installments) throw new Error("The installment amount could not exceed 25% of monthly income");
			loan.rate = 10;
			await saveInstallmentsUsingSAC(loan);
		}
		if (loan.type === "car") {
			if (loan.installments > 60) throw new Error("The maximum number of installments for car loan is 60");
			if ((loan.income * 0.30) < loan.amount/loan.installments) throw new Error("The installment amount could not exceed 30% of monthly income");
			loan.rate = 15;
			await saveInstallmentsUsingPrice(loan);
		}
		await saveLoan(loan);
	}
}
