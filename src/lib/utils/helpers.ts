// Helper to format the file size
export function formatFileSize(size: number): string {
	const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	return size === 0 ? '0 Bytes' : (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

// Helper to format the date
export function formatDate(date: number): string {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
// Function to truncate long file names
export function truncateFileName(name: string, maxLength: number = 50): string {
	if (name.length > maxLength) {
		return name.slice(0, maxLength) + '...';
	}
	return name;
}
