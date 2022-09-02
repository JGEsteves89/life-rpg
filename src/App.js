import './App.css';
import PlayerStats from './PlayerStats';
import Quests from './Quests';
import Api from './Api.js';
import React from 'react';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			api: null,
		};
	}

	componentDidMount() {
		Api.get().then((api) => {
			this.setState({ api: api });
		});
	}

	render() {
		const api = this.state.api;
		if (api) {
			const player = api.player;
			const quests = api.getQuests();
			//console.log('App Quests', quests.length);
			return (
				<div className="App">
					<header className="App-header">
						<PlayerStats api={api} player={player}></PlayerStats>
						<div className="boards-grid">
							<Quests api={api} quests={quests}></Quests>
						</div>
					</header>
				</div>
			);
		}
		return (
			<div className="App">
				<header className="App-header"></header>
			</div>
		);
	}
}
