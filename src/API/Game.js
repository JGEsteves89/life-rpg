import Player from './Player';
import Store from './Store';
import QuestBoard from './QuestBoard';
import Selable from './Selable';
import Quest from './Quest';

export default class Game {
	constructor() {
		this.player = new Player();
		this.store = new Store();
		this.questBoard = new QuestBoard();
	}
	async load() {
		return fetch('https://life-rpg.ijimiguel.workers.dev/')
			.then((response) => response.json())
			.then((data) => {
				//console.log('Game Quests', data.quests.length);
				this.player.cloneFrom(data.player);
				this.store.cloneFrom(data);
				this.questBoard.cloneFrom(data);
			});
	}
	async save() {
		return fetch('https://life-rpg.ijimiguel.workers.dev/', {
			method: 'POST',
			body: JSON.stringify({
				player: this.player,
				items: this.store.items,
				quests: this.questBoard.quests,
			}),
		});
	}

	getQuests() {
		return this.questBoard.quests;
	}

	getQuest(questNumber) {
		return this.questBoard.quests[questNumber];
	}

	addQuest(name, description, prize, repeatable) {
		this.questBoard.quests.push(
			new Quest(name, description, prize, repeatable)
		);
	}

	doQuest(quest) {
		return this.questBoard.doQuest(quest, this.player);
	}

	getItems() {
		return this.store.items;
	}

	getItem(itemNumber) {
		return this.store.items[itemNumber];
	}

	addItem(name, description, price) {
		this.store.items.push(new Selable(name, description, price));
	}

	sellItem(item) {
		return this.store.sellItem(item, this.player);
	}
}
