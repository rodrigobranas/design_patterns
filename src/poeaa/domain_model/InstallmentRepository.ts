import Installment from "./Installment";
import Loan from "./Loan";

export default interface InstallmentRepository {
	save (installment: Installment): Promise<void>;
	listByLoanId (loanId: string): Promise<Installment[]>;
}

export class InstallmentRepositoryMemory implements InstallmentRepository {
	installments: Installment[];
	static instance: InstallmentRepository;

	private constructor () {
		this.installments = [];
	}

	async save(installment: Installment): Promise<void> {
		this.installments.push(installment);
	}

	async listByLoanId(loanId: string): Promise<Installment[]> {
		const installments = this.installments.filter((installment: Installment) => installment.loanId === loanId);
		return installments;
	}

	static getInstance () {
		if (!InstallmentRepositoryMemory.instance) {
			InstallmentRepositoryMemory.instance = new InstallmentRepositoryMemory();
		}
		return InstallmentRepositoryMemory.instance;
	}
}
