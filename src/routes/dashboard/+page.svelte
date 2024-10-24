<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Navigation from '$lib/components/Nav/Navigation.svelte';
	import Search from '$lib/components/ui/Search.svelte';
	import FileList from '$lib/components/FileList.svelte';
	import type { FileData } from '$lib/utils/types';

	let userInitial = 'MJ'; // to be replaced with user's initials
	let files: FileData[] = []; // Store the uploaded files
	let searchTerm = ''; // Store the search term
	let filteredFiles: FileData[] = files; // Files to display after filtering

	//Handle file input change
	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const selectedFiles = Array.from(input.files || []);
		files = [...files, ...selectedFiles];
		filterFiles(); // Apply filtering after adding new files
	}

	// Handle files dropped via FileList's drag-drop event
	function handleFilesDropped(event: { detail: FileData[] }) {
		files = [...files, ...event.detail];
		filterFiles(); // Apply filtering after adding new files
	}

	//Trigger file input from button click
	function triggerFileInput() {
		document.getElementById('file-input')?.click();
	}
	// Handle search term change from Search component
	function handleSearch(event: { detail: string }) {
		searchTerm = event.detail;
		filterFiles();
	}

	// Filter the files based on the search term
	function filterFiles() {
		filteredFiles = files.filter((file) =>
			file.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
</script>

<main class="h-screen flex flex-col bg-gray-200">
	<Header {userInitial} />

	<div class="flex flex-grow">
		<aside class="sm:w-1/4 ss:w-1/6 bg-gray-200 p-4 mt-3">
			<Navigation />
		</aside>

		<section class="flex-grow p-6 rounded-lg bg-white mt-3 mr-6">
			<Search on:search={handleSearch} />

			<!-- Button to add files -->
			<div class="mt-4">
				<Button
					customStyles="bg-blue-600 hover:bg-blue-700"
					label="+ Add files"
					fullWidth={false}
					onClick={triggerFileInput}
				/>
				<input
					type="file"
					id="file-input"
					accept=".csv,.xlsx,.json,.xls, .pdf, .doc, .docx"
					multiple
					class="hidden"
					on:change={handleFileChange}
				/>
			</div>

			<!-- Display the list of uploaded files -->
			<FileList files={filteredFiles} on:filesDropped={handleFilesDropped} />
		</section>
	</div>
</main>
