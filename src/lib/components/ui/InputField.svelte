<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let value = '';
	export let id = '';
	export let errorMessage = '';
	export let required = false;
	export let validate: ((value: string) => boolean) | null = null;
	import { createEventDispatcher } from 'svelte';

	let isTouched = false;
	let showError = false;

	const dispatch = createEventDispatcher();

	// Handle input change
	function handleInput(event: Event) {
		value = (event.target as HTMLInputElement).value;
		checkError();
		dispatchValidation();
	}

	// Handle blur to mark input as touched
	function handleBlur() {
		isTouched = true;
		checkError();
		dispatchValidation();
	}

	function checkError() {
		if (required && isTouched) {
			showError = validate ? !validate(value) : value.trim() === '';
		}
	}

	// Dispatch the validation result to parent components
	function dispatchValidation() {
		const isValid = !showError && value.trim() !== '';
		dispatch('valid', isValid);
	}
</script>

<div class="mb-4">
	<label for={id} class="block mb-2">{label}</label>
	<input
		{type}
		{id}
		{value}
		on:input={handleInput}
		on:blur={handleBlur}
		class="w-full p-2 border rounded {showError ? 'border-red-500' : ''}"
	/>
	{#if showError}
		<p class="text-red-500 text-xs italic">{errorMessage}</p>
	{/if}
</div>
