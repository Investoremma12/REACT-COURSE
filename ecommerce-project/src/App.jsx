import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomePage } from './pages/Home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/orders/OrderPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { ErrorPage } from './pages/ErrorPage';

function App() {
	const [cart, setCart] = useState([]);
	const loadCart = async () => {
		const response = await axios.get('/api/cart-items?expand=product');
		setCart(response.data);
	};
	useEffect(() => {
		loadCart();
	}, []);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<HomePage cart={cart} loadCart={loadCart} />}
				/>
				<Route
					path="checkout"
					element={<CheckoutPage cart={cart} loadCart={loadCart} />}
				/>
				<Route path="orders" element={<OrderPage cart={cart} />} />
				<Route
					path="tracking/:orderId/:productId"
					element={<TrackingPage cart={cart} />}
				/>
				<Route path="*" element={<ErrorPage cart={cart} />} />
			</Routes>
		</>
	);
}

export default App;
