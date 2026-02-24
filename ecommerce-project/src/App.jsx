import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { ErrorPage } from './pages/ErrorPage';

function App() {
	const [cart, setCart] = useState([]);
	useEffect(() => {
		axios.get('/api/cart-items?expand=product').then((response) => {
			setCart(response.data);
		});
	}, []);

	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage cart={cart} />} />
				<Route path="checkout" element={<CheckoutPage cart={cart} />} />
				<Route path="orders" element={<OrderPage />} />
				<Route path="tracking" element={<TrackingPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</>
	);
}

export default App;
