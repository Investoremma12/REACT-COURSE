import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './TrackingPage.css';
import { Link } from 'react-router';
import { useParams } from 'react-router';

export function TrackingPage({ cart }) {
	const { orderId, productId } = useParams();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			const response = await axios.get(
				`/api/orders/${orderId}?expand=products`,
			);

			setOrder(response.data);
		};
		fetchOrderData();
	}, [orderId]);

	if (!order) {
		return null;
	}

	const matchingProduct = order.products.find(
		(product) => product.productId === productId,
	);

	const totalDeliveryTimeMs =
		matchingProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
	const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

	const deliveryPercent = Math.min(
		(timePassedMs / totalDeliveryTimeMs) * 100,
		100,
	);

	const isPreparing = deliveryPercent < 33;
	const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
	const isDelivered = deliveryPercent === 100;
	return (
		<>
			<title>Tracking</title>
			<link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

			<Header cart={cart} />

			<div className="tracking-page">
				<div className="order-tracking">
					<Link className="back-to-orders-link link-primary" to="/orders">
						View all orders
					</Link>

					<div className="delivery-date">
						Arriving on
						{dayjs(matchingProduct.estimatedDeliveryTimeMs).format('MMMM D')}
					</div>

					<div className="product-info">{matchingProduct.product.name}</div>

					<div className="product-info">
						Quantity: {matchingProduct.quantity}
					</div>

					<img className="product-image" src={matchingProduct.product.image} />

					<div className="progress-labels-container">
						<div
							className={`progress-label ${isPreparing && 'current-status'}`}
						>
							Preparing
						</div>
						<div className={`progress-label ${isShipped && 'current-status'}`}>
							Shipped
						</div>
						<div
							className={`progress-label ${isDelivered && 'current-status'}`}
						>
							Delivered
						</div>
					</div>

					<div className="progress-bar-container">
						<div
							className="progress-bar"
							style={{ width: `${deliveryPercent}%` }}
						></div>
					</div>
				</div>
			</div>
		</>
	);
}
