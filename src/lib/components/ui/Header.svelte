<script lang="ts">
	import Logo from '../ui/Logo.svelte';

	export let userInitial: string = ''; // Default initial value for now, will be set later
</script>

<header class="bg-gray-200 shadow-md text-blue p-4 flex justify-between items-center">
	<div class="flex items-center text-grey-400">
		<Logo /> DropFile
	</div>
	<div class="flex items-center">
		<span
			class="bg-blue-500 w-10 h-10 flex justify-center items-center rounded-full text-white text-lg font-semibold"
			>{userInitial}</span
		>
	</div>
</header>
