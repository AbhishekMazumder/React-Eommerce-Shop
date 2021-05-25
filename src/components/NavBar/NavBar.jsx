import React from 'react';
import {
	AppBar,
	Menu,
	MenuItem,
	Typography,
	Badge,
	IconButton,
	Toolbar,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';

import useStyles from './styles';

const NavBar = () => {
	const classes = useStyles();
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" className={classes.title} color="inherit">
						<img src={logo} alt="" height="25px" className={classes.logo} />
						E-Commerce Shop
					</Typography>
					<div className={classes.grow} />
					<div className={classes.button}>
						<IconButton aria-label="show cart item" color="inherit">
							<Badge badgeContent={2} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
