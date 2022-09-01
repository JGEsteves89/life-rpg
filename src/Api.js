import Game from './API/Game.js';
export default class Api {
	constructor() {
		this.game = undefined;
	}
	static get() {
		if (!this.game) {
			this.game = new Game();
			this.game.constructor = null;
			this.game.load();
			if (!this.game.player || this.game.store || this.game.questBoard) {
				this.game.save();
			}
		}
		return this.game;
	}
}
