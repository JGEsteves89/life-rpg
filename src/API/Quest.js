import Transactionable from './Transactionable';

export default class Quest extends Transactionable {
	constructor(name, description, prize, repeatable = false) {
		super(name, description);
		this.prize = prize;
		this.done = false;
		this.repeatable = repeatable;
	}
	markAsDone() {
		if (!this.repeatable) {
			this.done = true;
		}
	}
}
