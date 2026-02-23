import { Header } from '../components/Header';
import './ErrorPage.css';

export function ErrorPage() {
	return (
		<>
			<Header />
			<h1 className="error-page">Page not found</h1>
		</>
	);
}
