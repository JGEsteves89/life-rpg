import Quest from './Quest';
import Clonable from './Clonable';

export default class QuestBoard extends Clonable {
	constructor() {
		super();
		this.quests = [];
	}
	doQuest(quest, player) {
		const questExists = this.quests.filter((q) => q === quest).length > 0;
		if (!questExists) {
			console.warn('The quest you are trying to do does not exist');
			return false;
		}
		if (quest.done) {
			console.warn('This quest was already done');
			return false;
		}
		player.preformQuest(quest);
		return true;
	}
	cloneFrom(data) {
		this.quests = [];
		for (const quest of data.quests) {
			this.quests.push(
				new Quest(quest.name, quest.description, quest.prize, quest.repeatable)
			);
		}
	}
}
