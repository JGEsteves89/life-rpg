import React from 'react';
import './Quests.css';
import Quest from './Quest';
export default class Quests extends React.Component {
	render() {
		return (
			<div className="questsList">
				<h2>Quest Board</h2>
				{this.props.quests.map((quest) => {
					return (
						<Quest className="questInfo" quest={quest} key={quest.name}></Quest>
					);
				})}
			</div>
		);
	}
}
