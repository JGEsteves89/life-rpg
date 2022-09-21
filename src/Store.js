import React from 'react';
import { ListItem, IconButton, ListItemText, Typography } from '@mui/material';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

import './App.css';
import style from './style.js';
import ItemDialog from './ItemDialog.js';
import Selable from './API/Selable.js';
import ListItems from './ListItems.js';
import ChipStack from './Chips.js';

export default class Store extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.items,
			appUpdate: props.appUpdate,
			api: props.api,
			sortSettings: [
				{ name: 'Date', attribute: 'id', des: true, active: true },
				{ name: 'Price', attribute: 'price', des: true, active: false },
			],
			filterSettings: [],
			alert: props.alert,
		};

		this.chipStack = new ChipStack(
			this.state.sortSettings,
			this.state.filterSettings,
			this.onfilterOrSortChanged
		);
	}
	onfilterOrSortChanged = () => {
		this.setState({
			sortSettings: this.state.sortSettings,
			filterSettings: this.state.filterSettings,
		});
	};

	itemChanged = (item) => {
		if (item) {
			if (item.id === -1) {
				this.state.api.addItem(
					'' + item.name,
					'' + item.description,
					+item.price
				);
			} else {
				this.state.api.updateItem(
					+item.id,
					'' + item.name,
					'' + item.description,
					+item.price
				);
			}
			this.state.appUpdate();
		}
	};
	deleteItem = (itemId) => {
		this.state.api.deleteItem(itemId);
		this.state.appUpdate();
	};
	buyItem = (itemId) => {
		const result = this.state.api.sellItem(itemId);
		if (result) {
			this.state.alert('Item bought');
			this.state.appUpdate();
		}
	};

	render() {
		return (
			<ListItems
				items={this.state.items}
				appUpdate={this.state.appUpdate}
				itemComponent={MyItem}
				actions={[this.buyItem]}
				itemDialogComponent={ItemDialog}
				onItemChangeCallback={this.itemChanged}
				onItemDeletedCallback={this.deleteItem}
				chipStack={this.chipStack}
				newItem={() => new Selable('', '', 0)}
			/>
		);
	}
}
class MyItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: props.item,
			actions: props.actions,
			openDialog: props.openDialogCallback,
		};
	}
	render() {
		const item = this.state.item;
		return (
			<ListItem
				className="disabled quest"
				sx={style().shadow1.bgSec.m(0.5)}
				key={item.id}
				secondaryAction={
					<IconButton
						aria-label="Do quest"
						sx={style().mi(-1)}
						onClick={() => {
							this.setState({ clicked: true });
							this.state.actions[0](item.id);
							this.setState({ clicked: false });
						}}>
						<SellOutlinedIcon />
					</IconButton>
				}>
				<ListItemText
					onClick={() => this.state.openDialog(item)}
					sx={style().clSec.pcursor}
					secondaryTypographyProps={style().clPrim}
					primary={item.name}
					secondary={item.description}
				/>

				<Typography sx={style().cl('red')} variant="subtitle1">
					{item.price}
				</Typography>
			</ListItem>
		);
	}
}
