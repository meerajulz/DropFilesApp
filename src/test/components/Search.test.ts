import { render, fireEvent } from '@testing-library/svelte';
import Search from '$lib/components/ui/Search.svelte';
import { describe, it, expect, vi } from 'vitest';

describe('Search Component', () => {
	// Test to verify the search event is emitted when typing

	// Test to verify that clicking the clear button clears the search
	it('should clear the search when clicking the clear button', async () => {
		const { getByPlaceholderText, getByRole } = render(Search);
		const input = getByPlaceholderText('Search Files') as HTMLInputElement;

		// Simulate typing into the input
		await fireEvent.input(input, { target: { value: 'test query' } });

		// Simulate clicking the clear button (XMark)
		const clearButton = getByRole('button', { name: 'Clear search' });
		await fireEvent.click(clearButton);

		// Check that the input is cleared
		expect(input.value).toBe('');
	});

	// Test to verify the icon changes based on the search term
	it('should show correct icon based on the search term', async () => {
		const { getByPlaceholderText, queryByLabelText } = render(Search);
		const input = getByPlaceholderText('Search Files');

		// Check if the Magnifying Glass icon is present initially
		expect(queryByLabelText('Magnifying Glass icon')).toBeInTheDocument();

		// Simulate typing into the input
		await fireEvent.input(input, { target: { value: 'test' } });

		// Check if the Clear button is present and the Magnifying Glass icon is hidden
		expect(queryByLabelText('Clear search')).toBeInTheDocument();
		expect(queryByLabelText('Magnifying Glass icon')).not.toBeInTheDocument();
	});
});
