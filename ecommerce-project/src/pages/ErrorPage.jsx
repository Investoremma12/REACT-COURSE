import { Header } from '../components/Header';
import './ErrorPage.css';

export function ErrorPage({ cart }) {
	return (
		<>
			<Header cart={cart} />
			<h1 className="error-page">Page not found</h1>
		</>
	);
}
