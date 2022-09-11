import Transactionable from './Transactionable';

export default class Selable extends Transactionable {
	constructor(name, description, price, id = -1) {
		super(id, name, description);
		this.price = price;
	}
}
