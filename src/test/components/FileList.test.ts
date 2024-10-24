import { render, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import FileList from '../../lib/components/FileList.svelte';

const mockFiles = [
	{ name: 'file1.txt', size: 1024, lastModified: Date.now() },
	{ name: 'file2.pdf', size: 2048, lastModified: Date.now() }
];

test('renders file list correctly', () => {
	const { getByText } = render(FileList, { props: { files: mockFiles } });

	// Check if the files are rendered correctly
	expect(getByText('file1.txt')).toBeInTheDocument();
	expect(getByText('file2.pdf')).toBeInTheDocument();
});

test('deletes a file and shows a success alert', async () => {
	const { getByText, queryByText } = render(FileList, { props: { files: mockFiles } });

	// Find the file item (file1.txt)
	const file1Item = getByText('file1.txt').closest('li'); // Get the closest li element

	// Find the delete button inside the file1.txt item
	if (file1Item) {
		const deleteButton = file1Item.querySelector('button[aria-label="Delete file"]');
		if (deleteButton) {
			await fireEvent.click(deleteButton);
		}
	}

	// Check if the file is removed from the list
	expect(queryByText('file1.txt')).not.toBeInTheDocument();

	// Check if the success alert is displayed
	expect(getByText('File "file1.txt" deleted successfully.')).toBeInTheDocument();
});
