import React, { store } from 'react';
import './Quests.css';

const doneQuest = {
	pointerEvents: 'none',
	opacity: 0.4,
	transition: 'opacity 1s',
};
const unDoneQuest = {
	pointerEvents: 'all',
	opacity: 1,
	transition: 'opacity 1s',
};

export default class Quest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			done: this.props.quest.done,
		};
	}

	doQuest(quest) {
		const result = this.props.api.doQuest(quest);
		if (result) {
			this.setState({
				done: quest.done,
			});
		}
		this.props.onChange();
	}
	render() {
		return (
			<div
				className="questInfo fill-width"
				style={this.state.done ? doneQuest : unDoneQuest}
				onTransitionEnd={this.doQuest.bind(this, this.props.quest)}
			>
				<div className="add flex justify-center">
					<div
						onClick={() =>
							this.setState({
								done: true,
							})
						}
						className="align-center emoji clicable"
					>
						▶️
					</div>
				</div>
				<div className="info fill-width">
					<div className="row align-left fill-width title">
						<div className="flex">
							<p>{this.props.quest.name}</p>
							<div className="align-right">
								{this.props.quest.repeatable && <div className="emoji">🔁</div>}
							</div>
						</div>
					</div>
					<div className="row align-left description">
						<p>{this.props.quest.description}</p>
					</div>
					<div className="row align-right">
						<div className="description">
							<p>{this.props.quest.prize}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
