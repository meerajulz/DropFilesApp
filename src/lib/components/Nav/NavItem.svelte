<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	export let icon: IconSource;
	export let label = '';
	export let link = '';
</script>

<li class="mb-2">
	<a href={link} class="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
		<span class="mr-3">
			<Icon src={icon} class="h-6 w-6" />
		</span>
		<span class="hidden sm:block"> {label}</span>
	</a>
</li>
