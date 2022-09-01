import Transactionable from './Transactionable';

export default class Selable extends Transactionable {
	constructor(name, description, price) {
		super(name, description);
		this.price = price;
	}
}
