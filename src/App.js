import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import './App.css';
import Api from './Api.js';
import Player from './Player.js';
import QuestBoard from './QuestBoard.js';

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
			selectedPage: Pages.Quests,
		};
	}

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

	showSelectPage() {
		if (this.state.selectedPage === Pages.Player) {
			return (
				<Player
					player={this.state.api.getPlayer()}
					key={this.state.api._player}
				/>
			);
		} else if (this.state.selectedPage === Pages.Quests) {
			return (
				<QuestBoard
					api={this.state.api}
					appUpdate={this.handleUpdate}
					quests={this.state.api.getQuests()}
					key={this.state.api._questBoard.items}
				/>
			);
		} else {
			return;
		}
	}
	render() {
		if (!this.state.api) {
			return;
		}
		const player = this.state.api.getPlayer();
		return (
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar
						className="bg-primary"
						sx={{ justifyContent: 'space-between' }}>
						<Avatar
							alt="Icons"
							src={process.env.PUBLIC_URL + '/icons8-shield-arcade-96.png'}
						/>
						<Box>
							<Button
								sx={{ color: this.isSelectedClass(Pages.Player) }}
								onClick={() => this.setState({ selectedPage: Pages.Player })}>
								Player
							</Button>
							<Button
								sx={{ color: this.isSelectedClass(Pages.Quests) }}
								onClick={() => this.setState({ selectedPage: Pages.Quests })}>
								Quests
							</Button>
							<Button
								sx={{ color: this.isSelectedClass(Pages.Store) }}
								onClick={() => this.setState({ selectedPage: Pages.Store })}>
								Store
							</Button>
						</Box>
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
				{this.showSelectPage()}
			</Box>
		);
	}
}
