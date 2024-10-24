<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let searchTerm = ''; // hold the search term

	//Emit the search term whenever the input changes
	function handleInputChange(event: Event) {
		searchTerm = (event.target as HTMLInputElement).value;
		console.log(searchTerm);
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
	<div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-gray-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			style="color: #4a4a4a;"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M11 4a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7zm0 0v.01M21 21l-4.35-4.35"
			/>
		</svg>
	</div>
</div>

<style>
	/* Custom placeholder style */
	input::placeholder {
		color: #4a4a4a; /* Dark gray color */
	}
</style>
