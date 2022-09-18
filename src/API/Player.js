import Clonable from './Clonable';
import Ledger from './Ledger';
import Transaction from './Transaction';

const fa = 0.922;
const fi = 0.248;
export default class Player extends Clonable {
	constructor() {
		super();
		this.xp = 0;
		this.coins = 0;
		this.ledger = new Ledger();
		this.nextLevelXp = 0;
	}
	get level() {
		const lvl = this.getLevelOfXp(this.xp);
		this.nextLevelXp = this.getXpOfLevel(1 + Math.floor(lvl));
		return lvl;
	}
	getLevelOfXp(xp) {
		let level = Math.log(xp / fa) / fi;
		if (level < 0) {
			level = 0;
		}
		return level;
	}
	getXpOfLevel(level) {
		if (level === 0) {
			return 0;
		}
		return fa * Math.exp(fi * level);
	}
	percentageToNextLevel() {
		const startXpLevel = this.getXpOfLevel(Math.floor(this.level));
		const nextXpLevel = this.getXpOfLevel(1 + Math.floor(this.level));

		return (this.xp - startXpLevel) / (nextXpLevel - startXpLevel);
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
				new Transaction(transaction.item, transaction.value, transaction.date)
			);
		}
	}
}
