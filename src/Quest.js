import React from 'react';
import './Quests.css';
export default class Quest extends React.Component {
	render() {
		return (
			<div className="questInfo fill-width">
				<div className="add"></div>
				<div className="info fill-width">
					<div className="row align-left title">
						<p>{this.props.quest.name}</p>
					</div>
					<div className="row align-left description">
						<p>{this.props.quest.description}</p>
					</div>
					<div className="row align-right description">
						<p>{this.props.quest.prize}</p>
					</div>
				</div>
				<div className="more"></div>
			</div>
		);
	}
}
