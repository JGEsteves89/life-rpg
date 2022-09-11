import Player from './Player';
import Store from './Store';
import QuestBoard from './QuestBoard';
import Selable from './Selable';
import Quest from './Quest';

export default class Game {
	constructor() {
		this._player = new Player();
		this._store = new Store();
		this._questBoard = new QuestBoard();
	}

	loadData(data) {
		this._player.cloneFrom(data.player);
		this._store.cloneFrom(data);
		this._questBoard.cloneFrom(data);
	}

	getData() {
		return {
			player: this._player,
			items: this._store.items,
			quests: this._questBoard.items,
		};
	}

	async load() {
		return fetch('https://life-rpg.ijimiguel.workers.dev/')
			.then((response) => response.json())
			.then((data) => {
				this.loadData(data);
			});
	}
	async save() {
		return fetch('https://life-rpg.ijimiguel.workers.dev/', {
			method: 'POST',
			body: JSON.stringify(this.getData()),
		});
	}

	getPlayer() {
		return this._player;
	}

	getQuests() {
		return this._questBoard.items;
	}

	getQuest(id) {
		return this._questBoard.get(id);
	}

	addQuest(name, description, prize, repeatable, done = false) {
		this._questBoard.add(new Quest(name, description, prize, repeatable, done));
	}

	updateQuest(id, name, description, prize, repeatable) {
		this._questBoard.update(
			id,
			new Quest(name, description, prize, repeatable, id)
		);
	}

	deleteQuest(id) {
		this._questBoard.delete(id);
	}

	doQuest(id) {
		return this._questBoard.doQuest(id, this._player);
	}

	getItems() {
		return this._store.items;
	}

	getItem(id) {
		return this._store.get(id);
	}

	addItem(name, description, price) {
		this._store.add(new Selable(name, description, price));
	}

	updateItem(id, name, description, price) {
		this._store.update(id, new Selable(name, description, price, id));
	}

	deleteItem(id) {
		this._store.delete(id);
	}

	sellItem(id) {
		return this._store.sellItem(id, this._player);
	}
}
