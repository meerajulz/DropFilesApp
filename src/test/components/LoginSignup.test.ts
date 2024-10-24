import { render, fireEvent } from '@testing-library/svelte';
import { vi } from 'vitest';
import LoginSignup from '../../lib/components/LoginSignup.svelte';
import { goto } from '$app/navigation';

// Mock the `goto` function to simulate redirection
vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

describe('LoginSignup Component', () => {
	test('renders the login form by default', () => {
		const { getByText, getByLabelText } = render(LoginSignup);

		// Check for the presence of the login form elements
		expect(getByText('Log in')).toBeInTheDocument();
		expect(getByLabelText('Email')).toBeInTheDocument();
		expect(getByLabelText('Password')).toBeInTheDocument();
	});

	test('toggles to the sign-up form', async () => {
		const { getByText, getAllByText, queryByLabelText } = render(LoginSignup);

		// Click on the 'Create an account' button
		const toggleButton = getByText('Create an account');
		await fireEvent.click(toggleButton);

		// Check for multiple "Sign Up" occurrences
		const signUpElements = getAllByText('Sign Up');
		expect(signUpElements).toHaveLength(2); // Expect both the heading and button to exist

		// Check for the presence of the "Confirm Password" field
		expect(queryByLabelText('Confirm Password')).toBeInTheDocument();
	});

	test('submits the form and redirects', async () => {
		const { getByText, getByLabelText } = render(LoginSignup);

		// Fill out the form
		await fireEvent.input(getByLabelText('Email'), { target: { value: 'test@example.com' } });
		await fireEvent.input(getByLabelText('Password'), { target: { value: 'password123' } });

		// Submit the form
		const submitButton = getByText('Login');
		await fireEvent.click(submitButton);

		// Check if the form triggers a redirection
		expect(goto).toHaveBeenCalledWith('/dashboard');
	});
});
