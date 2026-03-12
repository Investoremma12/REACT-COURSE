import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { PaymentSummary } from './PaymentSummary';
import axios from 'axios';
import { MemoryRouter } from 'react-router';

// 1. Mock axios just like in your other tests
vi.mock('axios');

describe('PaymentSummary component', () => {
	let paymentData;

	beforeEach(() => {
		// 2. Define the sample data based on your API response
		paymentData = {
			totalItems: 3,
			productCostCents: 4275,
			shippingCostCents: 499,
			totalCostBeforeTaxCents: 4774,
			taxCents: 477,
			totalCostCents: 5251,
		};

		// 3. Mock the GET request
		axios.get.mockImplementation(async (urlPath) => {
			if (urlPath === '/api/payment-summary') {
				return { data: paymentData };
			}
		});
	});

	it('displays the payment summary details correctly', async () => {
		render(
			<MemoryRouter>
				<PaymentSummary paymentSummary={paymentData} />
			</MemoryRouter>,
		);

		// Wait for the data to load (similar to finding products in HomePage)
		// We use findBy to handle the async loading state
		const totalRow = await screen.findByTestId('payment-summary-row-total');

		// Requirement: Search for correct dollar amounts inside rows
		const shippingRow = screen.getByTestId('payment-summary-row-shipping');
		expect(within(shippingRow).getByText('$4.99')).toBeInTheDocument();

		const taxRow = screen.getByTestId('payment-summary-row-estimated-tax');
		expect(within(taxRow).getByText('$4.77')).toBeInTheDocument();

		// Requirement: Use toHaveTextContent for the total
		expect(totalRow).toHaveTextContent('$52.51');
	});

	it('displays the correct number of items', async () => {
		render(
			<MemoryRouter>
				<PaymentSummary paymentSummary={paymentData} />
			</MemoryRouter>,
		);

		const itemsRow = await screen.findByTestId('payment-summary-row-items');

		// Using the same "within" pattern as your HomePage test
		expect(itemsRow).toHaveTextContent('3');
	});
});
