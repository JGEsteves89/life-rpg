import Game from '../src/API/Game';
import readlineSync from 'readline-sync';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
// command line app to interface with the data
const game = new Game();
let exiting = false;

const DB_PATH = path.join(__dirname, 'data.json');

load().then(() => {
	while (!exiting) {
		const command = getCommand();
		localLoad();
		command.run(command.args);
		localSave();
	}
});

function localSave() {
	const rawData = JSON.stringify(game.getData(), null, 4);
	fs.writeFileSync(DB_PATH, rawData);
}

function localLoad() {
	const rawData = fs.readFileSync(DB_PATH);
	const data = JSON.parse(rawData.toString());
	game.loadData(data);
}

function save() {
	console.log('Saving');
	exiting = true;
	axios
		.post('https://life-rpg.ijimiguel.workers.dev/', game.getData())
		.then(() => {
			console.log('Saved');
			process.exit(0);
		});
}

async function load() {
	return axios
		.get('https://life-rpg.ijimiguel.workers.dev/')
		.then((response) => response.data)
		.then((data) => {
			game.loadData(data);
			localSave();
		});
}

function getCommand() {
	// list of the Available commands
	const commands = {
		'listquests|lq': listQuests,
		'addquest|aq': addQuest,
		'doquest|dq': doQuest,
		'listitems|li': listItems,
		'additem|ai': addItem,
		'buyitem|bi': buyItem,
		'exit|e': exit,
	};
	const command = readlineSync.question(
		'Available commands listQuests|addQuest|doQuest|listItems|addItem|buyItem|exit\n'
	);
	// split string by spaces expect the ones in quotes
	const args = command.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/);
	if (args[0] && args[0].length != 0) {
		for (var key in commands) {
			if (key.split('|').includes(args[0].toLowerCase())) {
				return { run: commands[key], args: args };
			}
		}
	}
	return { run: printPlayerStats, args: [] };
}

function printPlayerStats() {
	const player = game.getPlayer();
	console.log('Coins:', '\t', '💶 ', player.coins);
	console.log('Level:', '\t', '📈 ', player.level.toFixed(1));

	const clxp = Math.min(
		player.getXpOfLevel(Math.floor(player.level)),
		player.xp
	);

	const nlxp = player.getXpOfLevel(player.level + 1);
	const soFar = player.xp - clxp;
	const lvlXp = nlxp - clxp;

	// console.log('Start level xp:', clxp);
	// console.log('Next level xp:', nlxp);
	// console.log('All xp Level:', lvlXp);
	// console.log('Current player xp:', player.xp);

	// console.log('Xp so far', soFar);
	// console.log('Percentage done', ((soFar / lvlXp) * 100).toFixed(0) + '%');

	const nf = Math.floor((10 * soFar) / lvlXp);
	const ne = 10 - nf;
	const bar = '▓'.repeat(nf) + '░'.repeat(ne);

	console.log(
		'Xp:',
		'\t',
		'🔧 ',
		player.xp.toFixed(1),
		bar,
		player.nextLevelXp.toFixed(1)
	);
	console.log('Last Transctions:');
	for (var i = 0; i < player.ledger.transactions.length; i++) {
		const transaction = player.ledger.transactions[i];
		console.log(
			transaction.date,
			'-',
			'💶 ',
			transaction.value,
			'\t',
			transaction.item.name
		);
	}
}
function listQuests(args) {
	console.log('Available Quests');
	const table = [];
	for (const quest of game.getQuests()) {
		table.push({
			ID: quest.id,
			Prize: quest.prize,
			Name: quest.name,
			Done: quest.done ? 'DONE' : 'TODO',
			Rep: quest.repeatable,
		});
	}
	console.table(table);
}

function addQuest(args) {
	if (args.length < 4) {
		console.log('Error: format name, description, prize, [repeatable]');
		return;
	}
	const name = args[1].replaceAll('"', '');
	const description = args[2].replaceAll('"', '');
	const prize = +args[3];
	let repeatable = false;
	if (args.length === 5) {
		repeatable = true;
	}
	game.addQuest(name, description, prize, repeatable);
	listQuests();
}

function doQuest(args) {
	if (args.length != 2) {
		console.log('Error: id');
		return;
	}
	const id = +args[1];
	const res = game.doQuest(id);
	if (!res) {
		return;
	}
	printPlayerStats();
}
function listItems(args) {
	console.log('Selling Items');
	const table = [];
	for (const item of game.getItems()) {
		table.push({
			Id: item.id,
			Prize: item.price,
			Name: item.name,
			Description: item.description ? item.description : '',
		});
	}
	console.table(table);
}

function addItem(args) {
	if (args.length < 4) {
		console.log('Error: format name, description, price');
		return;
	}
	const name = args[1].replaceAll('"', '');
	const description = args[2].replaceAll('"', '');
	const price = +args[3];
	game.addItem(name, description, price);
	listItems();
}
function buyItem(args) {
	if (args.length != 2) {
		console.log('Error: id');
		return;
	}
	const id = +args[1];
	const res = game.sellItem(id);
	if (!res) {
		console.log('Item not bought');
		return;
	}
	printPlayerStats();
}
function exit() {
	console.log('Exiting');
	save();
}
