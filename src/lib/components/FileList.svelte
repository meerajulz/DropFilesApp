<script lang="ts">
	// to store updated files
	export let files: any[] = [];
	let selectedFile: null = null;

	//function to handle file selection
	function selectFile(file: null) {
		selectedFile = file;
	}

	// Handle keyboard interaction (Enter or Space)
	function handleKeyDown(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLLIElement },
		file: null
	) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectFile(file);
		}
	}

	// Helper to format the file size
	function formatFileSize(size: number) {
		const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		return size === 0 ? '0 Bytes' : (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
	}

	// Helper to format the date
	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="mt-6">
	<!-- Titles Row -->
	<div class="flex justify-between font-bold text-gray-700 border-b border-gray-300 pb-2">
		<div class="flex-1">File Name</div>
		<div class="w-32 text-right">Size</div>
		<div class="w-48 text-right">Date Added</div>
	</div>

	{#if files.length > 0}
		<ul>
			{#each files as file}
				<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
				<li
					class="flex justify-between items-center py-2 pl-2 border-b border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out {selectedFile ===
					file
						? 'bg-blue-200'
						: ''}"
					on:click={() => selectFile(file)}
					on:keydown={(event) => handleKeyDown(event, file)}
					tabindex="0"
					role="button"
					aria-pressed={selectedFile === file ? 'true' : 'false'}
				>
					<div class="flex-1 truncate">
						{file.name}
					</div>
					<div class="w-32 text-sm text-gray-500 text-right">
						{formatFileSize(file.size)}
					</div>
					<div class="w-48 text-sm text-gray-500 text-right">
						{formatDate(file.lastModified)}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
	{#if files.length === 0}
		<p class="text-gray-500">No files uploaded yet.</p>
	{/if}
</div>
