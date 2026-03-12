import './Header.css';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';

export function Header({ cart }) {
	const [searchParams] = useSearchParams();

	const urlSearch = searchParams.get('search') || '';
	const [searched, setSearched] = useState(urlSearch);

	const navigate = useNavigate();

	let totalQuantity = 0;

	cart.forEach((cartItem) => {
		totalQuantity += cartItem.quantity;
	});

	const searchBar = (event) => {
		setSearched(event.target.value);
	};

	const searchBarButton = () => {
		navigate(`/?search=${searched}`);
	};
	return (
		<>
			<div className="header">
				<div className="left-section">
					<NavLink to="/" className="header-link">
						<img className="logo" src="images/logo-white.png" />
						<img className="mobile-logo" src="images/mobile-logo-white.png" />
					</NavLink>
				</div>

				<div className="middle-section">
					<input
						className="search-bar"
						type="text"
						placeholder="Search"
						value={searched}
						onChange={searchBar}
					/>

					<button className="search-button" onClick={searchBarButton}>
						<img className="search-icon" src="images/icons/search-icon.png" />
					</button>
				</div>

				<div className="right-section">
					<NavLink className="orders-link header-link" to="/orders">
						<span className="orders-text">Orders</span>
					</NavLink>

					<NavLink className="cart-link header-link" to="/checkout">
						<img className="cart-icon" src="images/icons/cart-icon.png" />
						<div className="cart-quantity">{totalQuantity}</div>
						<div className="cart-text">Cart</div>
					</NavLink>
				</div>
			</div>
		</>
	);
}
