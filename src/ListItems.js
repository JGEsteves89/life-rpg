import React from 'react';
import { Box, Card, Divider, List, IconButton, Dialog } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';
import style from './style.js';
import SearchBar from './SearchBar.js';

const mainBoxStyle = style().flex.frow.jcenter.m1.mi(0.1);
const cardHeaderStyle = style().flex.jbetween.acenter;

function filterBySearch(items, searchPattern) {
	if (searchPattern.length < 4) {
		return items;
	}

	return items.filter(
		(q) =>
			q.name.toLowerCase().includes(searchPattern) ||
			q.description.toLowerCase().includes(searchPattern)
	);
}
function filterByFilters(items, filters) {
	for (const filter of filters) {
		if (filter.active) {
			items = items.filter((i) => i[filter.attribute] === filter.showIf);
		}
	}
	return items;
}

function filterAndSortItems(items, searchPattern, filters, sorters) {
	items = filterBySearch(items, searchPattern);
	items = filterByFilters(items, filters);
	items = sortItems(items, sorters);
	return items;
}

function sortItems(items, sorters) {
	for (const sort of sorters) {
		if (sort.active) {
			items = items.sort(
				(a, b) => (sort.des ? 1 : -1) * a[sort.attribute] - b[sort.attribute]
			);
		}
	}
	return items;
}

export default class ListItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			showDialog: false,
			editItem: null,
			showDone: false,
			items: props.items,
			newItem: props.newItem,
			appUpdate: props.appUpdate,
			itemComponent: props.itemComponent,
			itemDialogComponent: props.itemDialogComponent,
			onItemChanged: props.onItemChangeCallback,
			onItemDeleted: props.onItemDeletedCallback,
			itemActions: props.actions,
			chipStack: props.chipStack,
		};
	}

	handleClickOpen = (item) => {
		this.setState({
			editItem: item,
			showDialog: true,
		});
	};

	handleClose = () => {
		this.setState({
			showDialog: false,
		});
	};

	render() {
		if (!this.state.items || this.state.items.length === 0) {
			console.warn('Attention, items with nothing in it');
		}
		const filteredItems = filterAndSortItems(
			this.state.items,
			this.state.search,
			this.state.chipStack.filterSettings,
			this.state.chipStack.sortSettings
		);

		const Item = this.state.itemComponent;
		const ItemDialog = this.state.itemDialogComponent;

		return (
			<Box sx={mainBoxStyle}>
				<Card raised={true} sx={style().w('90%').bgPrim}>
					<Box sx={style().m(1).mi(0.5)}>
						<Box sx={cardHeaderStyle}>
							<SearchBar
								search={this.state.search}
								onSearchUpdated={(search) => {
									this.setState({ search: search });
								}}
							/>
							<IconButton
								aria-label="add"
								sx={style().mi(0.5)}
								onClick={() => this.handleClickOpen(this.state.newItem())}>
								<AddCircleOutlineOutlinedIcon />
							</IconButton>
						</Box>
						<Divider sx={style().m1} />
						{this.state.chipStack.getSortComponents().map((comp) => {
							return comp;
						})}
						{this.state.chipStack.getFilterComponents().map((comp) => {
							return comp;
						})}
						<List sx={style().bgPrim}>
							{/* <TransitionGroup component="ul"> */}
							{filteredItems.map((item) => {
								return (
									// <CSSTransition
									// 	key={item.id}
									// 	timeout={1000}
									// 	classNames="item">
									<Item
										key={item.id}
										item={item}
										openDialogCallback={this.handleClickOpen}
										actions={this.state.itemActions}
									/>
									// </CSSTransition>
								);
							})}
							{/* </TransitionGroup> */}
						</List>
					</Box>
				</Card>
				<Dialog open={this.state.showDialog} fullWidth={true}>
					<ItemDialog
						onItemChanged={this.state.onItemChanged}
						onItemDeleted={this.state.onItemDeleted}
						item={this.state.editItem}
						handleClose={this.handleClose}
					/>
				</Dialog>
			</Box>
		);
	}
}
