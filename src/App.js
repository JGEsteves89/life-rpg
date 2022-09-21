import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { AppBar, Snackbar, Box, Toolbar, Avatar } from '@mui/material';

import './App.css';
import Api from './Api.js';
import Player from './Player.js';
import QuestBoard from './QuestBoard.js';
import Store from './Store.js';
import NavBar from './NavBar.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			api: null,
			toastOpen: false,
			toastMessage: '',
		};
	}
	toastOpen = (message) => {
		this.setState({ toastOpen: true, toastMessage: message });
	};

	toastClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ toastOpen: false });
	};
	componentDidMount() {
		Api.get().then((api) => {
			this.setState({ api: api });
		});
	}

	handleUpdate = () => {
		this.setState({ api: this.state.api });
		this.state.api.save().then(() => {
			console.log('Data saved successfully');
		});
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
		const quests = this.state.api.getQuests().filter((q) => !q.repeatable);
		const habits = this.state.api.getQuests().filter((q) => q.repeatable);
		const items = this.state.api.getItems();
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
									quests={quests}
									key={quests}
									alert={this.toastOpen}
								/>
							}
						/>
						<Route
							path="/habitsBoard"
							element={
								<QuestBoard
									api={this.state.api}
									appUpdate={this.handleUpdate}
									quests={habits}
									key={habits}
									alert={this.toastOpen}
								/>
							}
						/>
						<Route
							path="/store"
							element={
								<Store
									api={this.state.api}
									appUpdate={this.handleUpdate}
									items={items}
									key={items}
									alert={this.toastOpen}
								/>
							}
						/>
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
				<Snackbar
					open={this.state.toastOpen}
					autoHideDuration={1000}
					onClose={this.toastClose}
					message={this.state.toastMessage}
				/>
			</Router>
		);
	}
}
