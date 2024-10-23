<script>
	export let icon;
	export let label = '';
	export let link = '';
</script>

<li class="mb-2">
	<a href={link} class="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
		<span class="mr-3">
			{@html icon}
		</span>
		{label}
	</a>
</li>
