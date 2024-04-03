import InstallmentRepository, { InstallmentRepositoryMemory } from "./InstallmentRepository";
import LoanRepository, { LoanRepositoryMemory } from "./LoanRepository";

export default interface RepositoryFactory {
	createLoanRepository (): LoanRepository;
	createInstallmentRepository (): InstallmentRepository;
}

export class RepositoryMemoryFactory implements RepositoryFactory {

	createLoanRepository(): LoanRepository {
		return LoanRepositoryMemory.getInstance();
	}

	createInstallmentRepository(): InstallmentRepository {
		return InstallmentRepositoryMemory.getInstance();
	}

}
