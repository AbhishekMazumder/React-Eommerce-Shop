import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Products, NavBar, Cart, Checkout } from './components';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, qty) => {
		const item = await commerce.cart.add(productId, qty);
		setCart(item.cart);
	};

	const handleUpdateCartQty = async (productId,  qty ) => {
		const item = await commerce.cart.update(productId, { qty });
		setCart(item.cart);
	};

	const handleRemoveFromCart = async productId => {
		const item = await commerce.cart.remove(productId);
		setCart(item.cart);
	};

	const handleEmptyCart = async () => {
		const item = await commerce.cart.empty();
		setCart(item.cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<Router>
			<div>
				<NavBar totalItems={cart.total_items} />
				<Switch>
					<Route exact path="/">
						<Products products={products} onAddToCart={handleAddToCart} />
					</Route>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout cart={cart} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
