import { DeliveryDate } from './DeliveryDate';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions }) {
	return (
		<div className="order-summary">
			{deliveryOptions.length > 0 &&
				cart.map((cartItem) => {
					return (
						<div key={cartItem.productId} className="cart-item-container">
							<DeliveryDate
								deliveryOptions={deliveryOptions}
								cartItem={cartItem}
							/>
							<div className="cart-item-details-grid">
								<CartItemDetails cartItem={cartItem} />
								<DeliveryOptions
									cartItem={cartItem}
									deliveryOptions={deliveryOptions}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
}
