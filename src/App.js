import './App.css';
import PlayerStats from './PlayerStats';
import Quests from './Quests';
import Api from './Api.js';
const api = Api.get();
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<PlayerStats player={api.player}></PlayerStats>
				<div className="boards-grid">
					<Quests quests={api.getQuests()}></Quests>
					<Quests quests={api.getQuests()}></Quests>
				</div>
			</header>
		</div>
	);
}

export default App;
