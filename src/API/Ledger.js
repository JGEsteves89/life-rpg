import Transaction from './Transaction';
export default class Ledger {
	constructor() {
		this.transactions = [];
	}
	addTransaction(transactionable, value, date) {
		this.transactions.push(new Transaction(transactionable, value, date));
	}
}
