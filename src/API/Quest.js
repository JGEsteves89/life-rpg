import Transactionable from './Transactionable';

export default class Quest extends Transactionable {
	constructor(
		name,
		description,
		prize,
		repeatable = false,
		done = false,
		id = -1
	) {
		super(id, name, description);
		this.prize = prize;
		this.done = done;
		this.repeatable = repeatable;
	}
	markAsDone() {
		if (!this.repeatable) {
			this.done = true;
		}
	}
}
