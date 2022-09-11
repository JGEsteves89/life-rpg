import Clonable from './Clonable';

export default class DatabasableList extends Clonable {
	constructor(name) {
		super();
		this.name = name;
		this.items = [];
	}

	generateId() {
		const sorted = this.items.sort((a, b) => b.id - a.id);
		if (!sorted[0]) return 0;
		return sorted[0].id + 1;
	}

	get(id) {
		return this.items.find((item) => item.id === id);
	}

	add(item) {
		item.id = this.generateId();
		console.log('New ID:', item.id, this.items);
		this.items.push(item);
	}

	update(id, item) {
		const index = this.items.findIndex((q) => q.id === id);
		if (index === -1) {
			console.warn('Item could not be found on list ' + this.name);
			return false;
		}
		item.id = id;
		this.items[index] = item;
		return true;
	}

	delete(id) {
		const index = this.items.findIndex((q) => q.id === id);
		if (index === -1) {
			console.warn('Item could not be found on list ' + this.name);
			return false;
		}
		this.items.splice(index, 1);
		return true;
	}
}
