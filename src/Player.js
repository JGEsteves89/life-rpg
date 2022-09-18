import React from 'react';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from '@mui/material';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import './App.css';
import style from './style.js';

const mainBoxStyle = style().flex.frow.jcenter.m1.mi(0.1);
const cardHeaderStyle = style().grid.gridTemp('2fr 1fr', '1fr 3fr').m(0.1);
const avatarStyle = style().row('1').col(1).w('20vw').h('20vw').m(1).shadow3;
const levelRowStyle = style().grid.gridTemp('2fr 1fr', '1fr 5fr').m(0.1);
const playerNameStyle = style().row(1).col(2).acenter;
const levelStyle = style().row('1/3').col(1).acenter.clPrim;
const levelBoxRowStyle = style().flex.frow.row(1).col(2).jbetween;

export default class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = { player: props.player };
	}
	render() {
		if (!this.state.player) return;
		const levelXpPercentageDone =
			(this.state.player.percentageToNextLevel() * 100).toFixed(0) + '%';
		return (
			<Box sx={mainBoxStyle}>
				<Card raised={true} sx={style().w('90%').bgPrim}>
					<Box sx={cardHeaderStyle}>
						<Avatar
							sx={avatarStyle}
							src={'https://avatars.githubusercontent.com/u/15027131?v=4'}
						/>
						<Typography variant="h4" sx={playerNameStyle}>
							José Esteves
						</Typography>
						<Typography variant="subtitle1" sx={style().row(2).col('1/3').mi1}>
							Hello darkness my old friend. I've come to talk width you again.
						</Typography>
					</Box>
					<CardContent>
						<Box sx={levelRowStyle}>
							<Typography variant="h3" sx={levelStyle}>
								{Math.floor(this.state.player.level)}
							</Typography>
							<Box sx={levelBoxRowStyle}>
								<Typography variant="subtitle1">Level</Typography>
								<Typography variant="subtitle1">
									{Math.ceil(this.state.player.nextLevelXp) + 'xp'}
								</Typography>
							</Box>
							<Box sx={style().row(2).col(2).bgSec.bradius('1rem')}>
								<Box
									sx={style()
										.flex.jaround.acenter.w(levelXpPercentageDone)
										.h('100%')
										.bg('var(--cl-selection)')
										.bradius('1rem')}>
									<Typography
										sx={style().cl('#101010').fsize('0.7rem')}
										variant="body2">
										{this.state.player.xp.toFixed(0) + 'xp'}
									</Typography>
								</Box>
							</Box>
						</Box>
						<Divider sx={style().m1} />
						<Box sx={levelBoxRowStyle.acenter.mr(1)}>
							<Typography variant="body1" sx={style().clPrim}>
								Current balance
							</Typography>
							<Typography variant="h6">{this.state.player.coins}</Typography>
						</Box>
						<Divider sx={style().m1} />
						<List sx={style().bgPrim}>
							{this.state.player.ledger.transactions.map(
								(transaction, index) => {
									return (
										<ListItem
											sx={style().shadow1.bgSec}
											key={index}
											secondaryAction={
												<IconButton aria-label="delete" sx={style().mi(-1)}>
													<DeleteOutlineOutlinedIcon />
												</IconButton>
											}>
											<ListItemIcon>
												{transaction.value > 0 && <TaskAltOutlinedIcon />}
												{transaction.value < 0 && <SellOutlinedIcon />}
											</ListItemIcon>
											<ListItemText
												sx={style().clSec}
												secondaryTypographyProps={style().clPrim}
												primary={transaction.item.name}
												secondary={new Date(transaction.date).toLocaleString()}
											/>
											<Typography
												sx={
													transaction.value > 0
														? style().cl('darkgreen')
														: style().cl('red')
												}
												variant="subtitle1">
												{transaction.value}
											</Typography>
										</ListItem>
									);
								}
							)}
						</List>
					</CardContent>
				</Card>
			</Box>
		);
	}
}
