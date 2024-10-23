<script>
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Nav/Navigation.svelte';
	import Search from '$lib/components/Search.svelte';
	let userInitial = 'MJ';
	let user = 'MeeraJulz';

	function handleAddFiles() {
		console.log('Add files');
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
				<Button label="+ Add files" fullWidth={false} onClick={handleAddFiles} />
			</div>
		</section>
	</div>
</main>
