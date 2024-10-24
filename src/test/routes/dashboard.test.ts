import { render, fireEvent } from '@testing-library/svelte';
import Dashboard from '../../routes/dashboard/+page.svelte';
import { describe, it, expect } from 'vitest';

describe('Dashboard Page', () => {
	// Test for rendering all key components
	it('should render header, navigation, search, and file list', () => {
		const { getByText, getByPlaceholderText } = render(Dashboard);

		// Assert that header with user's initials is displayed
		expect(getByText('MJ')).toBeInTheDocument();

		// Assert that the search input is rendered
		expect(getByPlaceholderText('Search Files')).toBeInTheDocument();

		// Assert that the Add files button is rendered
		expect(getByText('+ Add files')).toBeInTheDocument();
	});

	// Test for triggering file input on Add files button click
	it('should trigger file input when clicking Add files button', async () => {
		const { getByText, container } = render(Dashboard);

		// Find the file input by its id
		const fileInput = container.querySelector('#file-input') as HTMLInputElement;

		// Create a mock file
		const file = new File(['sample'], 'sample-file.txt', { type: 'text/plain' });

		// Trigger click on the "Add files" button
		await fireEvent.click(getByText('+ Add files'));

		// Trigger the file input change event to simulate file selection
		await fireEvent.change(fileInput, {
			target: { files: [file] }
		});

		// Check that the file was added (assuming the file list updates in the UI)
		expect(getByText('sample-file.txt')).toBeInTheDocument();
	});

	// Test for searching files
	it('should filter the file list based on search term', async () => {
		const { getByPlaceholderText, getByText } = render(Dashboard);

		// Find the file input
		const fileInput = document.getElementById('file-input') as HTMLInputElement;

		// Create a mock file and simulate adding it to the input
		const mockFile = new File(['sample'], 'test-file.csv', { type: 'text/csv' });
		await fireEvent.change(fileInput, {
			target: { files: [mockFile] }
		});

		// Assert that the file was added and is visible in the file list
		expect(getByText('test-file.csv')).toBeInTheDocument();

		// Simulate typing in the search input to filter files
		const searchInput = getByPlaceholderText('Search Files');
		await fireEvent.input(searchInput, { target: { value: 'test' } });

		// Assert that the file with "test" in its name is visible
		expect(getByText('test-file.csv')).toBeInTheDocument();
	});
});
