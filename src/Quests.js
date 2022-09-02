import React from 'react';
import './Quests.css';
import Quest from './Quest';
export default class Quests extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterUndone: true,
		};
	}

	toggleFilter() {
		this.setState({
			filterUndone: !this.state.filterUndone,
		});
	}

	onQuestChange() {
		this.setState({
			filterUndone: this.state.filterUndone,
		});
	}

	render() {
		const quests = this.props.quests.filter((q) =>
			this.state.filterUndone ? !q.done : true
		);
		//console.log('Quests Quests', quests.length);
		return (
			<div className="questsList">
				<h2>Quest Board</h2>
				<div
					onClick={this.toggleFilter.bind(this)}
					className="align-right emoji clicable"
				>
					{this.state.filterUndone ? (
						<div className="emoji">☑️</div>
					) : (
						<div className="emoji">✅</div>
					)}
				</div>
				{quests.map((quest) => {
					return (
						<Quest
							api={this.props.api}
							lassName="questInfo"
							quest={quest}
							key={quest.name}
							onChange={this.onQuestChange.bind(this)}
						></Quest>
					);
				})}
			</div>
		);
	}
}
