import { describe, it, expect } from 'vitest';
import { formatFileSize, formatDate, truncateFileName } from '$lib/utils/helpers';

describe('Helpers', () => {
	// Test for formatFileSize
	describe('formatFileSize', () => {
		it('should format 0 bytes correctly', () => {
			expect(formatFileSize(0)).toBe('0 Bytes');
		});

		it('should format sizes in KB, MB, GB, and TB correctly', () => {
			expect(formatFileSize(1024)).toBe('1.00 KB');
			expect(formatFileSize(1024 * 1024)).toBe('1.00 MB');
			expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00 GB');
			expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1.00 TB');
		});

		it('should handle small byte values correctly', () => {
			expect(formatFileSize(512)).toBe('512.00 Bytes');
		});
	});

	// Test for formatDate
	describe('formatDate', () => {
		it('should format the date correctly in "en-US" locale', () => {
			const date = new Date('2023-01-01').getTime(); // Mock date as a timestamp
			expect(formatDate(date)).toBe('January 1, 2023');
		});
	});

	// Test for truncateFileName
	describe('truncateFileName', () => {
		it('should return the full name if shorter than maxLength', () => {
			expect(truncateFileName('short-filename.txt')).toBe('short-filename.txt');
		});

		it('should truncate the file name if it exceeds maxLength', () => {
			const longName = 'this-is-a-very-long-filename-that-needs-to-be-truncated.txt';
			expect(truncateFileName(longName, 30)).toBe('this-is-a-very-long-filenam...');
		});

		it('should handle custom maxLength values', () => {
			const customLengthName = 'another-long-filename.txt';
			expect(truncateFileName(customLengthName, 10)).toBe('another...');
		});
	});
});
