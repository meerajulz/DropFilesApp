import { render, fireEvent } from '@testing-library/svelte';
import DragDrop from '../../lib/components/ui/DragDrop.svelte';

import { describe, it, expect, vi } from 'vitest';

describe('DragDrop Component', () => {
	// Test for changing background color on drag over
	it('should change background color when dragging over', async () => {
		const { container } = render(DragDrop);

		const dropArea = container.querySelector(
			'div[aria-label="Drag and drop files here to upload"]'
		);

		if (dropArea) {
			// Simulate dragging over the drop area
			await fireEvent.dragEnter(dropArea);

			// Check if the background color changes (class `bg-blue-100` should be applied)
			expect(dropArea).toHaveClass('bg-blue-100');

			// Simulate drag leave
			await fireEvent.dragLeave(dropArea);

			// Check if the background color is reset (class `bg-white` should be restored)
			expect(dropArea).toHaveClass('bg-white');
		} else {
			throw new Error('Drop area not found');
		}
	});
});
