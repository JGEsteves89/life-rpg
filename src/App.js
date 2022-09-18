import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

import './App.css';
import Api from './Api.js';
import Player from './Player.js';
import QuestBoard from './QuestBoard.js';
import NavBar from './NavBar.js';

const Pages = {
	Player: 'Player',
	Quests: 'Quests',
	Store: 'Store',
};
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			api: null,
		};
		this.page = Pages.Player;
	}
	navBar() {}
	componentDidMount() {
		Api.get().then((api) => {
			this.setState({ api: api });
		});
	}

	isSelectedClass(page) {
		if (this.state.selectedPage === page) {
			return 'var(--cl-primary)';
		}
		return 'var(--cl-secundary)';
	}

	handleUpdate = () => {
		this.setState({ api: this.state.api });
		// this.state.api.save().then(() => {
		// 	console.log('Data saved successfully');
		// });
		console.log('Data updated');
	};

	storeView() {
		return <h1>Hello darkness my old friend</h1>;
	}

	render() {
		if (!this.state.api) {
			return;
		}
		const player = this.state.api.getPlayer();
		return (
			<Router>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar
							className="bg-primary"
							sx={{ justifyContent: 'space-between' }}>
							<Avatar
								alt="Icons"
								src={process.env.PUBLIC_URL + '/icons8-shield-arcade-96.png'}
							/>
							<NavBar></NavBar>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									gap: '0.5rem',
									fontSize: '0.7rem',
								}}>
								<Box>
									<p>Level {Math.floor(player.level)}</p>
									<p>Coins {player.coins.toFixed(0)}</p>
								</Box>
								<Avatar
									alt="This is me"
									src="https://avatars.githubusercontent.com/u/15027131?v=4"
								/>
							</Box>
						</Toolbar>
					</AppBar>
					<Routes>
						<Route
							path="/questBoard"
							element={
								<QuestBoard
									api={this.state.api}
									appUpdate={this.handleUpdate}
									quests={this.state.api.getQuests()}
									key={this.state.api._questBoard.items}>
									{(this.page = Pages.Player)}
								</QuestBoard>
							}
						/>
						<Route path="/store" element={<>Hello Darkness my old friend</>} />
						<Route
							path="/player"
							element={
								<Player
									player={this.state.api.getPlayer()}
									key={this.state.api._player}
								/>
							}
						/>
						<Route path="*" element={<Navigate to="/player" replace />} />
					</Routes>
				</Box>
			</Router>
		);
	}
}
