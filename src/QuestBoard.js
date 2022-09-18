import React from 'react';
import {
	Box,
	Card,
	InputBase,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Dialog,
	Chip,
	Stack,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoopIcon from '@mui/icons-material/Loop';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';
import style from './style.js';
import QuestDialog from './QuestDialog.js';
import Quest from './API/Quest.js';

const mainBoxStyle = style().flex.frow.jcenter.m1.mi(0.1);
const cardHeaderStyle = style().flex.jbetween.acenter;

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));
const Attributes = {
	id: 'id',
	done: 'done',
	prize: 'prize',
};

export default class QuestBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quests: props.quests,
			search: '',
			showDialog: false,
			editQuest: null,
			appUpdate: props.appUpdate,
			api: props.api,
			filterSettings: { attribute: Attributes.id, des: true },
			showDone: false,
			showOnlyRepeatable: false,
		};
	}
	handleClickOpen = (quest) => {
		this.setState({
			editQuest: quest,
			showDialog: true,
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
		this.setState({
			showDialog: false,
		});
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
		this.setState({
			showDialog: false,
		});
		this.state.api.deleteQuest(questId);
		this.state.appUpdate();
	};
	doQuest(questId) {
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
	}
	render() {
		if (!this.state.quests || this.state.quests.length === 0) {
			console.warn('Attention, quests with nothing in it');
		}
		let filteredQuests =
			this.state.search !== ''
				? this.state.quests.filter(
						(q) =>
							q.name.toLowerCase().includes(this.state.search) ||
							q.description.toLowerCase().includes(this.state.search)
				  )
				: this.state.quests;

		const filter = this.state.filterSettings;
		filteredQuests = filteredQuests.sort((a, b) => {
			const neg = filter.des ? -1 : 1;
			const result = (a[filter.attribute] - b[filter.attribute]) * neg;
			return result;
		});
		if (!this.state.showDone) {
			filteredQuests = filteredQuests.filter((q) => !q.done);
		}
		if (this.state.showOnlyRepeatable) {
			filteredQuests = filteredQuests.filter((q) => q.repeatable);
		}
		return (
			<Box sx={mainBoxStyle}>
				<Card raised={true} sx={style().w('90%').bgPrim}>
					<Box sx={style().m(1).mi(0.5)}>
						<Box sx={cardHeaderStyle}>
							<Search
								onChange={(event) => {
									const searchPattern = event.target.value.toLowerCase();
									if (searchPattern.length < 3) {
										this.setState({ search: '' });
									} else {
										this.setState({ search: searchPattern });
									}
								}}>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									inputProps={{ 'aria-label': 'search' }}
								/>
							</Search>
							<IconButton
								aria-label="add"
								sx={style().mi(0.5)}
								onClick={() => this.handleClickOpen(new Quest('', '', 0))}>
								<AddCircleOutlineOutlinedIcon />
							</IconButton>
						</Box>
						<Divider sx={style().m1} />
						<Stack direction="row" spacing={1}>
							{this.sortChip('Date', Attributes.id)}
							{this.sortChip('Prize', Attributes.prize)}
							<Chip
								onClick={() =>
									this.setState({ showDone: !this.state.showDone })
								}
								label="Done"
								variant={this.state.showDone ? 'outlined' : ''}
							/>
							<Chip
								onClick={() =>
									this.setState({
										showOnlyRepeatable: !this.state.showOnlyRepeatable,
									})
								}
								label="Repeatable"
								variant={this.state.showOnlyRepeatable ? 'outlined' : ''}
							/>
						</Stack>
						<List sx={style().bgPrim}>
							<TransitionGroup component="ul">
								{filteredQuests.map((quest) => {
									return (
										<CSSTransition
											key={quest.id}
											timeout={1000}
											classNames="quest">
											<ListItem
												disabled={quest.done === true}
												className="disabled quest"
												sx={style().shadow1.bgSec.m(0.5)}
												key={quest.id}
												secondaryAction={
													<IconButton
														aria-label="delete"
														sx={style().mi(-1)}
														onClick={() => this.doQuest(quest.id)}>
														<TaskAltOutlinedIcon />
													</IconButton>
												}>
												<ListItemText
													onClick={() => this.handleClickOpen(quest)}
													sx={style().clSec.pcursor}
													secondaryTypographyProps={style().clPrim}
													primary={quest.name}
													secondary={quest.description}
												/>
												{quest.repeatable && <LoopIcon sx={style().mi(0.5)} />}
												<Typography
													sx={
														quest.prize > 0
															? style().cl('darkgreen')
															: style().cl('red')
													}
													variant="subtitle1">
													{quest.prize}
												</Typography>
											</ListItem>
										</CSSTransition>
									);
								})}
							</TransitionGroup>
						</List>
					</Box>
				</Card>
				<Dialog open={this.state.showDialog} fullWidth={true}>
					<QuestDialog
						onQuestChanged={this.questChanged}
						onQuestDeleted={this.deleteQuest}
						quest={this.state.editQuest}
						handleClose={this.handleClose}
					/>
				</Dialog>
			</Box>
		);
	}
}
