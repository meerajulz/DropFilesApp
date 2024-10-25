<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from './ui/Button.svelte';
	import Logo from './ui/Logo.svelte';
	import InputField from './ui/InputField.svelte';

	let isLogin = true;
	let email = '';
	let password = '';
	let confirmPassword = '';
	let error = '';

	// Validation flags when switching modes
	let isEmailValid = false;
	let isPasswordValid = false;
	let isConfirmPasswordValid = isLogin;

	// Helper to reset form fields and validation flags
	function resetForm() {
		email = '';
		password = '';
		confirmPassword = '';
		error = '';
		isEmailValid = false;
		isPasswordValid = false;
		isConfirmPasswordValid = true;
	}
	// Toggle between login and signup modes
	function toggleForm() {
		isLogin = !isLogin;
		resetForm();
	}

	function handleFormSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		// If it's sign-up, make sure passwords match
		if (!isLogin && password !== confirmPassword) {
			error = 'Passwords do not match.';
			return;
		}
		// Assuming the login was successful, redirect to the dashboard
		goto('/dashboard');
	}

	// Email validation logic
	const validateEmail = (value: string) => value.includes('@');

	// Password length validation logic
	const validatePassword = (value: string) => {
		isPasswordValid = value.length > 3;
		return isPasswordValid;
	};

	// Password confirmation validation logic
	const validateConfirmPassword = (value: string) => {
		isConfirmPasswordValid = value === password;
		return isConfirmPasswordValid;
	};

	// Handle password updates to re-validate confirmPassword
	$: validateConfirmPassword(confirmPassword);
</script>

<main class="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow-lg">
	<Logo />

	<h2 class="text-2xl text-center mb-6">{isLogin ? 'Log in' : 'Sign Up'}</h2>

	<form on:submit={handleFormSubmit}>
		<InputField
			label="Email"
			type="email"
			id="email"
			bind:value={email}
			required
			errorMessage="Email is not correct"
			validate={validateEmail}
			on:valid={(e) => (isEmailValid = e.detail)}
		/>
		<InputField
			type="password"
			label="Password"
			id="password"
			bind:value={password}
			required
			errorMessage="Password incorrect"
			validate={validatePassword}
			on:valid={(e) => (isPasswordValid = e.detail)}
		/>

		<!--If is sign up-->
		{#if !isLogin}
			<InputField
				label="Confirm Password"
				type="password"
				id="confirm-password"
				bind:value={confirmPassword}
				required
				errorMessage="Passwords do not match"
				validate={validateConfirmPassword}
				on:valid={(e) => (isConfirmPasswordValid = e.detail)}
			/>
		{/if}

		<p class="text-red-500 text-xs italic mb-2">
			<Button
				type="submit"
				label={isLogin ? 'Login' : 'Sign Up'}
				fullWidth
				disabled={!isEmailValid || !isPasswordValid || (!isLogin && !isConfirmPasswordValid)}
			/>
		</p>
	</form>

	<p class="text-center mt-4">
		<button class="text-blue-500 underline" on:click={toggleForm}>
			{isLogin ? 'Create an account' : 'Already have an account?'}
		</button>
	</p>
</main>
