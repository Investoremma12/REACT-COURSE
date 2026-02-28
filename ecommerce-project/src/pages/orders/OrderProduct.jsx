import { Fragment } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router';

export function OrderProduct({
	orderProduct,
	loadCart,
	order,
	quantity,
	setQuantity,
}) {
	setQuantity(1);

	const addToCart = async () => {
		await axios.post('/api/cart-items', {
			productId: orderProduct.product.id,
			quantity,
		});
		await loadCart();
	};
	return (
		<Fragment>
			<div className="product-image-container">
				<img src={orderProduct.product.image} />
			</div>

			<div className="product-details">
				<div className="product-name">{orderProduct.product.name}</div>
				<div className="product-delivery-date">
					Arriving on:{' '}
					{dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
				</div>
				<div className="product-quantity">
					Quantity: {orderProduct.quantity}
				</div>
				<button className="buy-again-button button-primary">
					<img className="buy-again-icon" src="images/icons/buy-again.png" />
					<span className="buy-again-message" onClick={addToCart}>
						Add to Cart
					</span>
				</button>
			</div>

			<div className="product-actions">
				<Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
					<button className="track-package-button button-secondary">
						Track package
					</button>
				</Link>
			</div>
		</Fragment>
	);
}
