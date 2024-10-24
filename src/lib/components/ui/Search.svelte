<script lang="ts">
	import { Icon, XMark, MagnifyingGlass } from 'svelte-hero-icons';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let searchTerm = ''; // hold the search term

	//Emit the search term whenever the input changes
	function handleInputChange(event: Event) {
		searchTerm = (event.target as HTMLInputElement).value;
		dispatch('search', searchTerm);
	}

	// Clear the search input
	function clearSearch() {
		searchTerm = '';
		dispatch('search', searchTerm);
	}
</script>

<div class="relative w-full">
	<input
		type="text"
		placeholder="Search Files"
		class="w-full px-4 py-2 border rounded bg-gray-200 text-gray-600 focus:outline-none"
		bind:value={searchTerm}
		on:input={handleInputChange}
	/>

	<div class="absolute inset-y-0 right-3 flex items-center">
		{#if searchTerm !== ''}
			<button
				type="button"
				class="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors"
				on:click={clearSearch}
				aria-label="Clear search"
			>
				<Icon src={XMark} class="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
			</button>
		{/if}

		{#if searchTerm === ''}
			<Icon
				src={MagnifyingGlass}
				class="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors"
			/>
		{/if}
	</div>
</div>

<style>
	/* Custom placeholder style */
	input::placeholder {
		color: #4a4a4a; /* Dark gray color */
	}
</style>
