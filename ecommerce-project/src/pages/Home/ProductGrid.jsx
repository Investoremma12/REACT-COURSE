import { Product } from './product';

export function ProductGrid({ products, loadCart, quantity, setQuantity }) {
	return (
		<div className="products-grid">
			{products.map((product) => {
				return (
					<Product
						key={product.id}
						product={product}
						loadCart={loadCart}
						quantity={quantity}
						setQuantity={setQuantity}
					/>
				);
			})}
		</div>
	);
}
