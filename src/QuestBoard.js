import React from 'react';
import {
	ListItem,
	IconButton,
	ListItemText,
	Typography,
	Chip,
} from '@mui/material';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './App.css';
import style from './style.js';
import QuestDialog from './QuestDialog.js';
import Quest from './API/Quest.js';
import ListItems from './ListItems.js';
import ChipStack from './Chips.js';

export default class QuestBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quests: props.quests,
			search: '',
			appUpdate: props.appUpdate,
			api: props.api,
			showDone: false,
			showOnlyRepeatable: false,
			sortSettings: [
				{ name: 'Date', attribute: 'id', des: true, active: true },
				{ name: 'Prize', attribute: 'prize', des: true, active: false },
			],
			filterSettings: [
				{ name: 'Not done', attribute: 'done', active: true, showIf: false },
				{
					name: 'Repeatable',
					attribute: 'repeatable',
					active: false,
					showIf: true,
				},
			],
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
	sortChip(label, attribute) {
		const currSettings = this.state.filterSettings;
		const callback = () => {
			if (currSettings.attribute === attribute) {
				currSettings.des = !currSettings.des;
			} else {
				currSettings.attribute = attribute;
				currSettings.des = true;
			}
			this.setState({ filterSettings: currSettings });
		};

		return (
			<Chip
				onClick={callback}
				icon={
					currSettings.attribute !== attribute ? (
						<div></div>
					) : currSettings.des ? (
						<KeyboardArrowDownIcon />
					) : (
						<KeyboardArrowUpIcon />
					)
				}
				label={label}
				variant={currSettings.attribute === attribute ? 'outlined' : ''}
			/>
		);
	}
	questChanged = (quest) => {
		if (quest) {
			if (quest.id === -1) {
				this.state.api.addQuest(
					'' + quest.name,
					'' + quest.description,
					+quest.prize,
					quest.repeatable,
					false
				);
			} else {
				this.state.api.updateQuest(
					+quest.id,
					'' + quest.name,
					'' + quest.description,
					+quest.prize,
					quest.repeatable,
					quest.done
				);
			}
			this.state.appUpdate();
		}
	};
	deleteQuest = (questId) => {
		this.state.api.deleteQuest(questId);
		this.state.appUpdate();
	};
	doQuest = (questId) => {
		const quest = this.state.quests.find((q) => q.id === questId);
		quest.done = true;

		this.setState({
			quests: this.state.quests,
		});
		setTimeout(
			function () {
				//Start the timer
				quest.done = false;
				const result = this.state.api.doQuest(questId);
				if (result) {
					this.state.appUpdate();
				}
			}.bind(this),
			500
		);
	};
	filterItems(quests, searchPattern) {
		if (searchPattern.length < 4) {
			return quests;
		}

		return quests.filter(
			(q) =>
				q.name.toLowerCase().includes(this.state.search) ||
				q.description.toLowerCase().includes(this.state.search)
		);
	}
	render() {
		// if (!this.state.quests || this.state.quests.length === 0) {
		// 	console.warn('Attention, quests with nothing in it');
		// }
		// let filteredQUests
		// const filter = this.state.filterSettings;
		// filteredQuests = filteredQuests.sort((a, b) => {
		// 	const neg = filter.des ? -1 : 1;
		// 	const result = (a[filter.attribute] - b[filter.attribute]) * neg;
		// 	return result;
		// });
		// if (!this.state.showDone) {
		// 	filteredQuests = filteredQuests.filter((q) => !q.done);
		// }
		// if (this.state.showOnlyRepeatable) {
		// 	filteredQuests = filteredQuests.filter((q) => q.repeatable);
		// }
		return (
			<ListItems
				items={this.state.quests}
				filterItemsCallback={this.filterItems}
				appUpdate={this.state.appUpdate}
				itemComponent={MyItem}
				actions={[this.doQuest]}
				itemDialogComponent={QuestDialog}
				onItemChangeCallback={this.questChanged}
				onItemDeletedCallback={this.deleteQuest}
				chipStack={this.chipStack}
				newItem={() => new Quest('', '', 0)}
			/>
		);
	}
}
class MyItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quest: props.item,
			actions: props.actions,
			openDialog: props.openDialogCallback,
		};
	}
	render() {
		const quest = this.state.quest;
		return (
			<ListItem
				disabled={quest.done === true}
				className="disabled quest"
				sx={style().shadow1.bgSec.m(0.5)}
				key={quest.id}
				secondaryAction={
					<IconButton
						aria-label="Do quest"
						sx={style().mi(-1)}
						onClick={() => this.state.actions[0](quest.id)}>
						<TaskAltOutlinedIcon />
					</IconButton>
				}>
				<ListItemText
					onClick={() => this.state.openDialog(quest)}
					sx={style().clSec.pcursor}
					secondaryTypographyProps={style().clPrim}
					primary={quest.name}
					secondary={quest.description}
				/>
				{quest.repeatable && <LoopIcon sx={style().mi(0.5)} />}
				<Typography
					sx={quest.prize > 0 ? style().cl('darkgreen') : style().cl('red')}
					variant="subtitle1">
					{quest.prize}
				</Typography>
			</ListItem>
		);
	}
}
