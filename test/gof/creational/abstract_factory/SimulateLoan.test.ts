import { CarLoanFactory, MortgageLoanFactory } from "../../../../src/gof/creational/abstract_factory/LoanFactory";
import SimulateLoan from "../../../../src/gof/creational/abstract_factory/SimulateLoan";

test("Deve simular um financiamento imobiliario", function () {
	const loanFactory = new MortgageLoanFactory();
	const simulateLoan = new SimulateLoan(loanFactory);
	const input = {
		amount: 100000,
		income: 40000,
		installments: 12
	}
	const output = simulateLoan.execute(input);
	expect(output.installments).toHaveLength(12);
	expect(output.installments.at(0)?.number).toBe(1);
	expect(output.installments.at(0)?.amount).toBe(9166.66);
	expect(output.installments.at(0)?.interest).toBe(833.33);
	expect(output.installments.at(0)?.amortization).toBe(8333.33);
	expect(output.installments.at(0)?.balance).toBe(91666.67);
	expect(output.installments.at(11)?.number).toBe(12);
	expect(output.installments.at(11)?.amount).toBe(8402.77);
	expect(output.installments.at(11)?.interest).toBe(69.44);
	expect(output.installments.at(11)?.amortization).toBe(8333.33);
	expect(output.installments.at(11)?.balance).toBe(0);
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
	console.log(output);
	expect(output.installments).toHaveLength(12);
	expect(output.installments.at(0)?.number).toBe(1);
	expect(output.installments.at(0)?.amount).toBe(9166.66);
	expect(output.installments.at(0)?.interest).toBe(833.33);
	expect(output.installments.at(0)?.amortization).toBe(8333.33);
	expect(output.installments.at(0)?.balance).toBe(91666.67);
	expect(output.installments.at(11)?.number).toBe(12);
	expect(output.installments.at(11)?.amount).toBe(8402.77);
	expect(output.installments.at(11)?.interest).toBe(69.44);
	expect(output.installments.at(11)?.amortization).toBe(8333.33);
	expect(output.installments.at(11)?.balance).toBe(0);
});
