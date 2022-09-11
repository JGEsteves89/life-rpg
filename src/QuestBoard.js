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
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

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
		};
	}
	handleClickOpen = (quest) => {
		this.setState({
			editQuest: quest,
			showDialog: true,
		});
	};

	questChanged = (quest) => {
		this.setState({
			showDialog: false,
		});
		if (quest) {
			if (quest.id === -1) {
				this.state.api.addQuest(
					quest.name,
					quest.description,
					quest.prize,
					quest.repeatable,
					false
				);
			} else {
				this.state.api.updateQuest(
					quest.id,
					quest.name,
					quest.description,
					quest.prize,
					quest.repeatable
				);
			}
			this.state.appUpdate();
		}
	};

	render() {
		if (!this.state.quests || this.state.quests.length === 0) {
			console.warn('Attention, quests with nothing in it');
		}
		const filteredQuests =
			this.state.search !== ''
				? this.state.quests.filter(
						(q) =>
							q.name.toLowerCase().includes(this.state.search) ||
							q.description.toLowerCase().includes(this.state.search)
				  )
				: this.state.quests;
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
						<List sx={style().bgPrim}>
							{filteredQuests.map((quest) => {
								return (
									<ListItem
										onClick={() => this.handleClickOpen(quest)}
										sx={style().shadow1.bgSec}
										key={quest.id}
										secondaryAction={
											<IconButton aria-label="delete" sx={style().mi(-1)}>
												<TaskAltOutlinedIcon />
											</IconButton>
										}>
										<ListItemText
											sx={style().clSec}
											secondaryTypographyProps={style().clPrim}
											primary={quest.name}
											secondary={quest.description}
										/>
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
								);
							})}
						</List>
					</Box>
				</Card>
				<Dialog open={this.state.showDialog} fullWidth={true}>
					<QuestDialog
						onQuestChanged={this.questChanged}
						quest={this.state.editQuest}
						handleClose={this.handleClose}
					/>
				</Dialog>
			</Box>
		);
	}
}
