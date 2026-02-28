import { OrderProduct } from './OrderProduct';

export function OrdersDetailsGrid({ order, loadCart, quantity, setQuantity }) {
	return (
		<div className="order-details-grid">
			{order.products.map((orderProduct) => {
				return (
					<OrderProduct
						key={orderProduct.product.id}
						orderProduct={orderProduct}
						loadCart={loadCart}
						order={order}
						quantity={quantity}
						setQuantity={setQuantity}
					/>
				);
			})}
		</div>
	);
}
