import React from 'react';
import {
	Box,
	DialogTitle,
	DialogContent,
	FormControlLabel,
	Button,
	TextField,
	DialogActions,
	Checkbox,
} from '@mui/material';

import './App.css';
import style from './style.js';

export default class QuestDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quest: props.item,
			onQuestChanged: props.onItemChanged,
			onQuestDeleted: props.onItemDeleted,
			handleClose: props.handleClose,
			buttonText: props.item.id !== -1 ? 'Save' : 'Add',
		};
	}
	onFormChange(e, attribute) {
		const quest = this.state.quest;
		quest[attribute] = e.target.value;
		if (attribute === 'repeatable') {
			quest[attribute] = e.target.checked;
		}
		this.setState({ quest: quest });
	}
	render() {
		return (
			<Box sx={style()}>
				<DialogTitle>Quest</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.quest.name}
						onChange={(e) => this.onFormChange(e, 'name')}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Description"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.quest.description}
						onChange={(e) => this.onFormChange(e, 'description')}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="prize"
						label="Prize"
						type="number"
						fullWidth
						variant="standard"
						value={this.state.quest.prize}
						onChange={(e) => this.onFormChange(e, 'prize')}
					/>
				</DialogContent>
				<FormControlLabel
					sx={style().mi1}
					control={
						<Checkbox
							checked={this.state.quest.repeatable}
							onChange={(e) => this.onFormChange(e, 'repeatable')}
						/>
					}
					label="Repeatable"
				/>
				<DialogActions>
					{this.state.quest.id !== -1 && (
						<Button
							sx={style().clWarn}
							onClick={() => {
								this.state.handleClose();
								this.state.onQuestDeleted(this.state.quest.id);
							}}>
							Delete
						</Button>
					)}
					<Button
						onClick={() => {
							this.state.handleClose();
							this.state.onQuestChanged(null);
						}}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							this.state.handleClose();
							this.state.onQuestChanged(this.state.quest);
						}}>
						{this.state.buttonText}
					</Button>
				</DialogActions>
			</Box>
		);
	}
}
