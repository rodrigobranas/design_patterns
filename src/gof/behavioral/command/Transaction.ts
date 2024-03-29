export default class Transaction {

	constructor (readonly type: "credit" | "debit", readonly amount: number) {
	}

}
