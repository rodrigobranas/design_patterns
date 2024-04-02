import { CarLoanFactory, MortgageLoanFactory } from "../../../../src/gof/creational/abstract_factory/LoanFactory";
import SimulateLoan from "../../../../src/gof/creational/abstract_factory/SimulateLoan";

test("Deve simular um financiamento imobiliario", function () {
	const loanFactory = new MortgageLoanFactory();
	const simulateLoan = new SimulateLoan(loanFactory);
	const input = {
		amount: 100000,
		income: 10000,
		installments: 240
	}
	const output = simulateLoan.execute(input);
	expect(output.installments).toHaveLength(240);
	expect(output.installments.at(0)?.number).toBe(1);
	expect(output.installments.at(0)?.amount).toBe(1250);
	expect(output.installments.at(0)?.interest).toBe(833.33);
	expect(output.installments.at(0)?.amortization).toBe(416.67);
	expect(output.installments.at(0)?.balance).toBe(99583.33);
	expect(output.installments.at(239)?.number).toBe(240);
	expect(output.installments.at(239)?.amount).toBe(420.14);
	expect(output.installments.at(239)?.interest).toBe(3.47);
	expect(output.installments.at(239)?.amortization).toBe(416.67);
	expect(output.installments.at(239)?.balance).toBe(0);
});

test("Deve simular um financiamento de carro", function () {
	const loanFactory = new CarLoanFactory();
	const simulateLoan = new SimulateLoan(loanFactory);
	const input = {
		amount: 50000,
		income: 20000,
		installments: 24
	}
	const output = simulateLoan.execute(input);
	expect(output.installments).toHaveLength(24);
	expect(output.installments.at(0)?.number).toBe(1);
	expect(output.installments.at(0)?.amount).toBe(2424.33);
	expect(output.installments.at(0)?.interest).toBe(625);
	expect(output.installments.at(0)?.amortization).toBe(1799.33);
	expect(output.installments.at(0)?.balance).toBe(48200.67);
	expect(output.installments.at(23)?.number).toBe(24);
	expect(output.installments.at(23)?.amount).toBe(2424.33);
	expect(output.installments.at(23)?.interest).toBe(29.93);
	expect(output.installments.at(23)?.amortization).toBe(2394.4);
	expect(output.installments.at(23)?.balance).toBe(0);
});
