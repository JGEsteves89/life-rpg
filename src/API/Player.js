import Clonable from './Clonable';
import Ledger from './Ledger';
import Transaction from './Transaction';

export default class Player extends Clonable {
	constructor() {
		super();
		this.xp = 10;
		this.coins = 0;
		this.ledger = new Ledger();
		this.nextLevelXp = 0;
	}
	get level() {
		const lvl = Player.getLevelOfXp(this.xp);
		this.nextLevelXp = Player.getXpOfLevel(lvl + 1);
		return lvl;
	}
	static getLevelOfXp(xp) {
		return Math.round(-10.5 + 5 * Math.log(xp));
	}
	static getXpOfLevel(level) {
		return Math.round(Math.exp((level + 10.5) / 5));
	}
	preformQuest(quest) {
		this.xp += quest.prize;
		this.coins += quest.prize;
		quest.markAsDone();
		this.ledger.addTransaction(quest, quest.prize, new Date());
	}
	buyItem(item) {
		this.coins -= item.price;
		this.ledger.addTransaction(item, -item.price, new Date());
	}
	cloneFrom(data) {
		this.xp = data.xp;
		this.coins = data.coins;
		this.ledger = new Ledger();
		for (const transaction of data.ledger.transactions) {
			this.ledger.transactions.push(
				new Transaction(transaction.name, transaction.value, transaction.data)
			);
		}
	}
}
