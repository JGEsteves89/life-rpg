import Selable from './Selable';
import DatabasableList from './DatabasableList';

export default class Store extends DatabasableList {
	constructor() {
		super('Store');
	}

	sellItem(id, player) {
		const item = this.get(id);
		if (!item) {
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
			this.items.push(
				new Selable(item.name, item.description, item.price, item.id)
			);
		}
	}
}
