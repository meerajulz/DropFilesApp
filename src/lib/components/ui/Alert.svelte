<script lang="ts">
	export let message: string = '';
	export let type: 'success' | 'error' = 'success';
	export let isVisible: boolean = false;

	function getAlertClasses() {
		return type === 'success'
			? 'bg-green-100 border-green-500 text-green-700'
			: 'bg-red-100 border-red-500 text-red-700';
	}
</script>

{#if isVisible}
	<div
		class="fixed bottom-3 bg-green-100 right-5 w-1/4 p-4 border rounded-md shadow-lg{getAlertClasses()}"
	>
		<strong>
			{type === 'success' ? 'Success' : 'Error'}
		</strong>
		<p class="text-green-900 text-sm">{message}</p>
	</div>
{/if}
