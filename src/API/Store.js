import Selable from './Selable';
import Clonable from './Clonable';

export default class Store extends Clonable {
	constructor() {
		super();
		this.items = [];
	}

	sellItem(item, player) {
		const itemExists = this.items.filter((i) => i === item).length > 0;
		if (!itemExists) {
			console.warn('The item you are trying to buy does not exist');
			return false;
		}
		if (item.price > player.coins) {
			console.warn('The player does not have enough coins to buy');
			return false;
		}
		player.buyItem(item);
		return true;
	}

	cloneFrom(data) {
		this.items = [];
		for (const item of data.items) {
			this.items.push(new Selable(item.name, item.description, item.price));
		}
	}
}
