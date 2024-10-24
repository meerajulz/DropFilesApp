<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let label: string = '';
	export let fullWidth: boolean = false;
	export let onClick: ((event: MouseEvent) => void) | null = null;
</script>

<button
	class="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none {fullWidth
		? 'w-full'
		: ''}"
	{type}
	on:click={onClick}
>
	{label}
</button>
