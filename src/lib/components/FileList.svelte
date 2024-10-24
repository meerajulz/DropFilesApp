<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { formatFileSize, formatDate, truncateFileName } from '$lib/utils/helpers.js';
	import { Icon, Trash } from 'svelte-hero-icons';
	import DragDrop from './ui/DragDrop.svelte';
	import Alert from '../components/ui/Alert.svelte';

	import type { FileData } from '$lib/utils/types';

	export let files: FileData[] = [];
	let selectedFile: FileData | null = null;
	let showAlert = false;
	let alertMessage = '';
	let alertType: 'success' | 'error' = 'success';

	const dispatch = createEventDispatcher();

	//Handle file selection
	function selectFile(file: FileData | null) {
		selectedFile = file;
	}

	// Handle keyboard interaction (Enter or Space)
	function handleKeyDown(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLLIElement },
		file: FileData | null
	) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectFile(file);
		}
	}
	// Handle file drop event from DragDrop Component and emit it to the parent
	function handleFilesDropped(event: { detail: FileData[] }) {
		dispatch('filesDropped', event.detail); // Emit the dropped files to the parent (main page)
	}

	// Handle file deletion with AlertComponent
	function deleteFile(file: FileData) {
		files = files.filter((f) => f !== file);
		dispatch('fileDeleted', file); // Emit the deleted file to the parent (main page)

		//show success Alert
		alertMessage = `File "${file.name}" deleted successfully.`;
		alertType = 'success';
		showAlert = true;

		//hide alert after 3 seconds
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	}
</script>

<div class="mt-6">
	<!-- Reusable Alert Component -->
	<Alert message={alertMessage} type={alertType} isVisible={showAlert} />

	<!-- Drag and Drop Area -->
	<DragDrop on:filesDropped={handleFilesDropped} />

	{#if files.length > 0}
		<!-- Titles Row -->
		<div class="flex justify-between font-bold text-gray-700 border-b border-gray-300 pb-2">
			<div class="w-1/2">File Name</div>
			<div class="w-1/3 text-right">Size</div>
			<div class="w-1/3 text-right">Date Added</div>
			<div class="w-1/6 text-right hidded"></div>
		</div>
		<ul>
			{#each files as file}
				<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
				<li
					class="flex justify-between items-center py-2 pl-2 pr-2 border-b border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out {selectedFile ===
					file
						? 'bg-blue-200'
						: ''}"
					on:click={() => selectFile(file)}
					on:keydown={(event) => handleKeyDown(event, file)}
					tabindex="0"
					role="button"
					aria-pressed={selectedFile === file ? 'true' : 'false'}
				>
					<div class="w-1/2 truncate">
						{truncateFileName(file.name)}
					</div>
					<div class="w-1/3 text-sm text-gray-500 text-right">
						{formatFileSize(file.size)}
					</div>
					<div class="w-1/3 text-sm text-right text-gray-500">
						{formatDate(file.lastModified)}
					</div>
					<div class="w-1/6 text-right">
						<button class="ml-4" on:click={() => deleteFile(file)} aria-label="Delete file">
							<Icon
								src={Trash}
								class="h-5 w-5 text-gray-900 hover:text-blue-600 transition-colors duration-200 ease-in-out"
							/>
						</button>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="flex justify-center items-center h-full">
		{#if files.length === 0}
			<p class="text-gray-500">No files uploaded yet.</p>
		{/if}
	</div>
</div>
