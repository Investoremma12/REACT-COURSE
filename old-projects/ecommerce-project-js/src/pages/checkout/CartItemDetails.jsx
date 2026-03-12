import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
	const [isUpdating, setIsUpdating] = useState(false);
	const [quantity, setQuantity] = useState(cartItem.quantity);

	const updateQuantity = async () => {
		if (isUpdating === false) {
			setIsUpdating(true);
		} else {
			await axios.put(`/api/cart-items/${cartItem.productId}`, {
				quantity,
			});
			await loadCart();
			setIsUpdating(false);
		}
	};
	const quantityInput = (event) => {
		setQuantity(Number(event.target.value));
	};
	const deleteCartItem = async () => {
		await axios.delete(`/api/cart-items/${cartItem.productId}`);
		await loadCart();
	};

	const updateQuantityKey = (event) => {
		if (event.key === 'Enter') {
			updateQuantity();
		} else if (event.key === 'Escape') {
			setIsUpdating(false);
		}
	};
	return (
		<>
			<img className="product-image" src={cartItem.product.image} />

			<div className="cart-item-details">
				<div className="product-name">{cartItem.product.name}</div>
				<div className="product-price">
					{formatMoney(cartItem.product.priceCents)}
				</div>
				<div className="product-quantity">
					<span>
						Quantity:{' '}
						<input
							type="text"
							className={isUpdating ? 'quantity-update' : 'no-quantity-input'}
							value={quantity}
							onChange={quantityInput}
							onKeyDown={updateQuantityKey}
						/>
						<span className="quantity-label"> {cartItem.quantity}</span>
					</span>
					<span
						className="update-quantity-link link-primary"
						onClick={updateQuantity}
					>
						Update
					</span>
					<span
						className="delete-quantity-link link-primary"
						onClick={deleteCartItem}
					>
						Delete
					</span>
				</div>
			</div>
		</>
	);
}
