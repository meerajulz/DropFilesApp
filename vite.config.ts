import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],

	resolve: {
		alias: {
			'svelte-icons': 'svelte-icons-pack'
		},
		// Ensure that Vitest uses browser-specific entry points
		...(process.env.VITEST ? { conditions: ['browser'] } : {})
	},

	test: {
		setupFiles: './setupVitest.ts',
		globals: true,
		environment: 'jsdom' // jsdom environment for DOM testing in Vitest
	}
});
