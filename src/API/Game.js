import Player from './Player';
import Store from './Store';
import QuestBoard from './QuestBoard';
import FileDBHandle from './FileDBHandle';
import Quest from './Quest';
import Selable from './Selable';

export default class Game {
	constructor() {
		this.player = new Player();
		this.store = new Store();
		this.questBoard = new QuestBoard();
	}
	load() {
		this.player = FileDBHandle.load('player', new Player());
		this.store = FileDBHandle.load('store', new Store());
		this.questBoard = FileDBHandle.load('questBoard', new QuestBoard());
	}
	save() {
		FileDBHandle.save('player', this.player);
		FileDBHandle.save('store', this.store);
		FileDBHandle.save('questBoard', this.questBoard);
	}

	getQuests() {
		return this.questBoard.quests;
	}

	// addQuest(name: string, description: string, prize: number, xp: number) {
	//     this.questBoard.quests.push(new Quest(name, description, prize));
	// }

	// doQuest(questNumber: number) {
	//     const quest = this.questBoard.quests[questNumber];
	//     this.questBoard.doQuest(quest, this.player);
	// }

	// listSellingItems() {
	//     console.log('Selling Items');
	//     const table = [];
	//     for (var i = 0; i < this.store.items.length; i++) {
	//         const item = this.store.items[i];
	//         table.push({ Prize: item.price, Name: item.name, Description: item.description ? item.description : '' })
	//     }
	//     console.table(table);
	// }

	// addItemToSell(name: string, description: string, price: number) {
	//     this.store.items.push(new Selable(name, description, price));
	// }

	// playerStats() {
	//     console.log("Coins:", "\t", "💶 " + this.player.coins);
	//     console.log("Level:", "\t", "📈 " + this.player.level);
	//     console.log("Xp:", "\t", "🔧 " + this.player.xp);
	//     console.log("Last Transctions:");
	//     for (var i = 0; i < this.player.ledger.transactions.length; i++) {
	//         const transaction = this.player.ledger.transactions[i];
	//         console.log(transaction.date, "-", "💶 " + transaction.value, "\t", transaction.item.name,)
	//     }
	// }
}
