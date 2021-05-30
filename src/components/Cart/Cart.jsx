import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({
	cart,
	handleUpdateCartQty,
	handleRemoveFromCart,
	handleEmptyCart,
}) => {
	const classes = useStyles();

	const EmptyCart = () => {
		return (
			<Typography variant="subtitle1">
				You have no item in cart.
				<Link to="/" className={classes.link}>
					Start addind some!
				</Link>
			</Typography>
		);
	};

	const FilledCart = () => (
		<div>
			<Grid container spacing={2}>
				{cart.line_items.map(item => (
					<Grid item xs={12} sm={3} key={item.id}>
						<CartItem
							item={item}
							handleUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h5">
					Subtotal:{cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						type="button"
						size="large"
						variant="contained"
						color="secondary"
						onClick={handleEmptyCart}
					>
						Empty Cart
					</Button>
					<Button
						component={Link}
						to="/checkout"
						className={classes.checkoutButton}
						type="button"
						size="large"
						variant="contained"
						color="primary"
					>
						Checkout
					</Button>
				</div>
			</div>
		</div>
	);

	if (!cart.line_items) return 'Loading...';

	return (
		<Container>
			<div className={classes.toolbar}></div>
			<Typography variant="h5" className={classes.title}>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
