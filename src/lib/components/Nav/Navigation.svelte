<script>
	import NavItem from './NavItem.svelte';
	import { Home, Folder, Cog6Tooth, ArrowRightOnRectangle } from 'svelte-hero-icons';
</script>

<nav>
	<ul>
		<NavItem icon={Home} label="Dashboard" link="/" />
		<NavItem icon={Folder} label="Files" link="/files" />
		<NavItem icon={Cog6Tooth} label="Settings" link="/settings" />
		<NavItem icon={ArrowRightOnRectangle} label="Logout" link="/" />
	</ul>
</nav>
