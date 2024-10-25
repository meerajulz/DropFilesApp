<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let label: string = '';
	export let fullWidth: boolean = false;
	export let onClick: ((event: MouseEvent) => void) | null = null;
	export let disabled: boolean = false;
	export let customStyles: string = '';
</script>

<button
	class="text-white py-2 px-4 rounded shadow focus:outline-none text-base
		{fullWidth ? 'w-full' : ''} 
		{customStyles} 
		{disabled ? 'bg-blue-100 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}"
	on:click={onClick}
	{disabled}
	{type}
>
	{label}
</button>
