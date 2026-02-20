import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.css';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/OrderPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="checkout" element={<CheckoutPage />} />
				<Route path="orders" element={<OrderPage />} />
			</Routes>
		</>
	);
}

export default App;
