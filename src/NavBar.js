import React from 'react';
import Box from '@mui/material/Box';
import { withRouter } from './withRouter.js';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
	render() {
		return (
			<Box>
				<NavLink
					to="/player"
					className={(navData) =>
						'nav-link' + (!navData.isActive ? ' unselected' : '')
					}>
					PLAYER
				</NavLink>
				<NavLink
					to="/questboard"
					className={(navData) =>
						'nav-link' + (!navData.isActive ? ' unselected' : '')
					}>
					QUESTS
				</NavLink>
				<NavLink
					to="/habitsBoard"
					className={(navData) =>
						'nav-link' + (!navData.isActive ? ' unselected' : '')
					}>
					HABITS
				</NavLink>
				<NavLink
					to="/store"
					className={(navData) =>
						'nav-link' + (!navData.isActive ? ' unselected' : '')
					}>
					STORE
				</NavLink>
			</Box>
		);
	}
}
export default withRouter(NavBar);
