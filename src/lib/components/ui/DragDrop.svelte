<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { FileData } from '$lib/utils/types'; // Import your FileData type

	let isDragging = false; // Flag to track when a file is being dragged over the drop area
	const dispatch = createEventDispatcher();

	// Handle file input change from the drop area
	function handleFileDrop(event: DragEvent) {
		event.preventDefault();
		const droppedFiles = event.dataTransfer?.files;
		if (droppedFiles) {
			const newFiles: FileData[] = Array.from(droppedFiles).map((file) => ({
				name: file.name,
				size: file.size,
				lastModified: file.lastModified
			}));
			// Emit the FileData objects to the parent component
			dispatch('filesDropped', newFiles); // Emit the files to the parent component
		}
		isDragging = false; // Reset dragging flag
	}

	// Prevent default behavior for dragover event
	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	// Handle dragenter and dragleave to change background
	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}
</script>

<!-- Drag and drop area with dynamic background -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<div
	class="flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg h-32 mt-4 mb-8 transition-colors duration-200 ease-in-out {isDragging
		? 'bg-blue-100'
		: 'bg-white'}"
	role="button"
	on:dragover={handleDragOver}
	on:drop={handleFileDrop}
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	aria-label="Drag and drop files here to upload"
>
	<p class="text-gray-500">Drag and drop files here to upload</p>
</div>
