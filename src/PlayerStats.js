import React from 'react';
import logo from './logo.svg';
import './PlayerStats.css';
export default class PlayerStats extends React.Component {
	render() {
		return (
			<div className="mainGrid">
				<div className="column1">
					<img src={logo} className="App-logo" alt="logo" />
				</div>
				<div className="column2">
					<div className="headRow">
						<p className="playerName">{this.props.player.name}</p>
						<p className="levelInfo">At level {this.props.player.level}</p>
					</div>
					<div className="statsRow">
						<div className="levelRow">
							<div className="emoji">🎚</div>
							<div className="content">{this.props.player.level}</div>
						</div>
						<div className="experienceRow">
							<div className="emoji">🎓</div>
							<div className="content">
								{this.props.player.xp}/{this.props.player.nextLevelXp}
							</div>
						</div>
						<div className="coinsRow">
							<div className="emoji">👛</div>
							<div className="content">{this.props.player.coins}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
