export default class Installment {

	constructor (readonly loanId: string, readonly number: number, readonly amount: number, readonly amortization: number, readonly interest: number, readonly balance: number) {

	}
}
