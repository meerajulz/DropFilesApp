import { render } from '@testing-library/svelte';
import Alert from '$lib/components/ui/Alert.svelte';
import { describe, it, expect } from 'vitest';

describe('Alert Component', () => {
	// Test for rendering success alert
	it('should render success alert when isVisible is true', () => {
		const { getByText } = render(Alert, {
			props: {
				message: 'Operation successful',
				type: 'success',
				isVisible: true
			}
		});

		// Check for the alert message and success styles
		expect(getByText('Success')).toBeInTheDocument();
		expect(getByText('Operation successful')).toBeInTheDocument();
	});

	// Test for rendering error alert
	it('should render error alert when type is error', () => {
		const { getByText } = render(Alert, {
			props: {
				message: 'Operation failed',
				type: 'error',
				isVisible: true
			}
		});

		// Check for the alert message and error styles
		expect(getByText('Error')).toBeInTheDocument();
		expect(getByText('Operation failed')).toBeInTheDocument();
	});

	// Test for not rendering when isVisible is false
	it('should not render when isVisible is false', () => {
		const { queryByText } = render(Alert, {
			props: {
				message: 'You should not see this',
				isVisible: false
			}
		});

		// Check that the alert is not in the document
		expect(queryByText('You should not see this')).not.toBeInTheDocument();
	});
});
