<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from './ui/Button.svelte';
	import Logo from './ui/Logo.svelte';

	let isLogin = true;

	let email = '';
	let password = '';
	let confirmPassword = '';
	let error: null = null;

	function toggleForm() {
		isLogin = !isLogin;
		error = null;
		email = '';
		password = '';
		confirmPassword = '';
	}

	function handleFormSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();

		// Assuming the login was successful, redirect to the dashboard
		goto('/dashboard');
	}
</script>

<main class="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow-lg">
	<Logo />

	<h2 class="text-2xl text-center mb-6">{isLogin ? 'Log in' : 'Sign Up'}</h2>

	<form on:submit={handleFormSubmit}>
		<div class="mb-4">
			<label for="email" class="block mb-2">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="w-full p-2 border rounded"
			/>
		</div>

		<div class="mb-4">
			<label for="password" class="block mb-2">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="w-full p-2 border rounded"
			/>
		</div>
		<!--If is sign up-->
		{#if !isLogin}
			<div class="mb-4">
				<label for="confirm-password" class="block mb-2">Confirm Password</label>
				<input
					type="password"
					id="confirm-password"
					bind:value={confirmPassword}
					required
					class="w-full p-2 border rounded"
				/>
			</div>
		{/if}

		<p class="text-red-500 text-xs italic mb-2">
			<Button type="submit" label={isLogin ? 'Login' : 'Sign Up'} fullWidth />
		</p>
	</form>

	<p class="text-center mt-4">
		<button class="text-blue-500 underline" on:click={toggleForm}>
			{isLogin ? 'Create an account' : 'Already have an account?'}
		</button>
	</p>
</main>
