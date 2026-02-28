import { Header } from '../../components/Header';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import './OrderPage.css';
import { OrdersGrid } from './OrdersGrid';

export function OrderPage({ cart, loadCart, quantity, setQuantity }) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrdersData = async () => {
			const response = await axios.get('/api/orders?expand=products');
			setOrders(response.data);
		};

		fetchOrdersData();
	});

	return (
		<>
			<title>Orders</title>
			<link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
			<Header cart={cart} />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

				<OrdersGrid
					orders={orders}
					loadCart={loadCart}
					quantity={quantity}
					setQuantity={setQuantity}
				/>
			</div>
		</>
	);
}
