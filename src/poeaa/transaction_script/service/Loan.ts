// struc (C), dicionário, tabela...

export default class Loan {

	constructor (
		public loanId: string, 
		readonly type: string, 
		readonly installments: number, 
		readonly income: number, 
		readonly amount: number, 
		public rate: number
	) {
	}
}
