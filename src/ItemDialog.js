import React from 'react';
import {
	Box,
	DialogTitle,
	DialogContent,
	Button,
	TextField,
	DialogActions,
} from '@mui/material';

import './App.css';
import style from './style.js';

export default class ItemDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: props.item,
			onItemChanged: props.onItemChanged,
			onItemDeleted: props.onItemDeleted,
			handleClose: props.handleClose,
			buttonText: props.item.id !== -1 ? 'Save' : 'Add',
		};
	}
	onFormChange(e, attribute) {
		const item = this.state.item;
		item[attribute] = e.target.value;
		if (attribute === 'repeatable') {
			item[attribute] = e.target.checked;
		}
		this.setState({ item: item });
	}
	render() {
		return (
			<Box sx={style()}>
				<DialogTitle>Item</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.item.name}
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
						value={this.state.item.description}
						onChange={(e) => this.onFormChange(e, 'description')}
					/>
				</DialogContent>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="price"
						label="Price"
						type="number"
						fullWidth
						variant="standard"
						value={this.state.item.price}
						onChange={(e) => this.onFormChange(e, 'price')}
					/>
				</DialogContent>

				<DialogActions>
					{this.state.item.id !== -1 && (
						<Button
							sx={style().clWarn}
							onClick={() => {
								this.state.handleClose();
								this.state.onItemDeleted(this.state.item.id);
							}}>
							Delete
						</Button>
					)}
					<Button
						onClick={() => {
							this.state.handleClose();
							this.state.onItemChanged(null);
						}}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							this.state.handleClose();
							this.state.onItemChanged(this.state.item);
						}}>
						{this.state.buttonText}
					</Button>
				</DialogActions>
			</Box>
		);
	}
}
