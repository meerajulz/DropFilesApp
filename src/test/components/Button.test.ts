import { render, fireEvent } from '@testing-library/svelte';
import Button from '$lib/components/ui/Button.svelte';
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
	// Test for rendering button with correct label
	it('should render with correct label', () => {
		const { getByText } = render(Button, {
			props: {
				label: 'Click Me'
			}
		});

		// Check if the button label is rendered
		expect(getByText('Click Me')).toBeInTheDocument();
	});

	// Test for button type
	it('should have the correct button type', () => {
		const { getByRole } = render(Button, {
			props: {
				type: 'submit',
				label: 'Submit'
			}
		});

		// Check if the button has the correct type
		expect(getByRole('button')).toHaveAttribute('type', 'submit');
	});

	// Test for full width class
	it('should apply full width class when fullWidth is true', () => {
		const { getByText } = render(Button, {
			props: {
				label: 'Full Width',
				fullWidth: true
			}
		});

		// Check if the full width class is applied
		expect(getByText('Full Width')).toHaveClass('w-full');
	});

	// Test for onClick event
	it('should call onClick when clicked', async () => {
		const mockClickHandler = vi.fn();
		const { getByText } = render(Button, {
			props: {
				label: 'Click Me',
				onClick: mockClickHandler
			}
		});

		// Simulate button click
		await fireEvent.click(getByText('Click Me'));

		// Check if the click handler was called
		expect(mockClickHandler).toHaveBeenCalled();
	});
});
