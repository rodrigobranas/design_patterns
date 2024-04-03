import { CarLoanFactory, MortgageLoanFactory } from "../../../../src/gof/creational/abstract_factory/LoanFactory";
import ApplyForLoan from "../../../../src/gof/creational/abstract_factory/ApplyForLoan";
import { RepositoryMemoryFactory } from "../../../../src/gof/creational/abstract_factory/RepositoryFactory";
import GetLoan from "../../../../src/gof/creational/abstract_factory/GetLoan";

test("Deve simular um financiamento imobiliario", async function () {
	const repositoryFactory = new RepositoryMemoryFactory();
	const loanFactory = new MortgageLoanFactory();
	const applyForLoan = new ApplyForLoan(repositoryFactory, loanFactory);
	const getLoan = new GetLoan(repositoryFactory);
	const input = {
		amount: 100000,
		income: 10000,
		installments: 240
	}
	const outputApplyForLoan = await applyForLoan.execute(input);
	const outputGetLoan = await getLoan.execute({ loanId: outputApplyForLoan.loanId });
	expect(outputGetLoan.installments).toHaveLength(240);
	expect(outputGetLoan.installments.at(0)?.number).toBe(1);
	expect(outputGetLoan.installments.at(0)?.amount).toBe(1250);
	expect(outputGetLoan.installments.at(0)?.interest).toBe(833.33);
	expect(outputGetLoan.installments.at(0)?.amortization).toBe(416.67);
	expect(outputGetLoan.installments.at(0)?.balance).toBe(99583.33);
	expect(outputGetLoan.installments.at(239)?.number).toBe(240);
	expect(outputGetLoan.installments.at(239)?.amount).toBe(420.14);
	expect(outputGetLoan.installments.at(239)?.interest).toBe(3.47);
	expect(outputGetLoan.installments.at(239)?.amortization).toBe(416.67);
	expect(outputGetLoan.installments.at(239)?.balance).toBe(0);
});

test("Deve simular um financiamento de carro", async function () {
	const repositoryFactory = new RepositoryMemoryFactory();
	const loanFactory = new CarLoanFactory();
	const applyForLoan = new ApplyForLoan(repositoryFactory, loanFactory);
	const getLoan = new GetLoan(repositoryFactory);
	const input = {
		amount: 50000,
		income: 20000,
		installments: 24
	}
	const outputApplyForLoan = await applyForLoan.execute(input);
	const outputGetLoan = await getLoan.execute({ loanId: outputApplyForLoan.loanId });
	expect(outputGetLoan.installments).toHaveLength(24);
	expect(outputGetLoan.installments.at(0)?.number).toBe(1);
	expect(outputGetLoan.installments.at(0)?.amount).toBe(2424.33);
	expect(outputGetLoan.installments.at(0)?.interest).toBe(625);
	expect(outputGetLoan.installments.at(0)?.amortization).toBe(1799.33);
	expect(outputGetLoan.installments.at(0)?.balance).toBe(48200.67);
	expect(outputGetLoan.installments.at(23)?.number).toBe(24);
	expect(outputGetLoan.installments.at(23)?.amount).toBe(2424.33);
	expect(outputGetLoan.installments.at(23)?.interest).toBe(29.93);
	expect(outputGetLoan.installments.at(23)?.amortization).toBe(2394.4);
	expect(outputGetLoan.installments.at(23)?.balance).toBe(0);
});
