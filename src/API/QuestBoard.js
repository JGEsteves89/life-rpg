import Quest from './Quest';
import DatabasableList from './DatabasableList';

export default class QuestBoard extends DatabasableList {
	constructor() {
		super('Quest Board');
	}

	cloneFrom(data) {
		this.items = [];
		if (data.quests) {
			for (const quest of data.quests) {
				this.items.push(
					new Quest(
						quest.name,
						quest.description,
						quest.prize,
						quest.repeatable,
						quest.done,
						quest.id
					)
				);
			}
		}
	}

	doQuest(id, player) {
		const quest = this.get(id);
		if (!quest) {
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
}
