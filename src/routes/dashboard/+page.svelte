<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Nav/Navigation.svelte';
	import Search from '$lib/components/Search.svelte';
	let userInitial = 'MJ'; // to be replaced with user's initials
	// to store updated files
	let files: any[] = [];

	//handle file input change
	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const selectedFiles = Array.from(input.files || []);
		files = [...files, ...selectedFiles];
		console.log(files);
	}
	//trigger file input from button click
	function triggerFileInput() {
		document.getElementById('file-input')?.click();
	}
</script>

<main class="h-screen flex flex-col bg-gray-200">
	<Header {userInitial} />

	<div class="flex flex-grow">
		<aside class="w-1/4 bg-gray-200 p-4 mt-3">
			<Navigation />
		</aside>

		<section class="flex-grow p-6 rounded-lg bg-white mt-3 mr-6">
			<Search />

			<!-- Button to add files -->
			<div class="mt-4">
				<Button label="+ Add files" fullWidth={false} onClick={triggerFileInput} />
			</div>
			<!-- File input -->
			<input
				type="file"
				id="file-input"
				accept=".csv,.xlsx,.json,.xls, .pdf, .doc, .docx"
				multiple
				class="hidden"
				on:change={handleFileChange}
			/>

			<!-- Display the list of uploaded files -->
			<div class="mt-6">
				{#if files.length > 0}
					<ul>
						{#each files as file}
							<li class="mb-2 text-gray-700">{file.name}</li>
						{/each}
					</ul>
				{/if}
				{#if files.length === 0}
					<p class="text-gray-500">No files uploaded yet.</p>
				{/if}
			</div>
		</section>
	</div>
</main>

<style>
</style>
