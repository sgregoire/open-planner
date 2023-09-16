import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    deps: {
      inline: ['moment'],
    },
    include: ['tests/**/*.{test,spec}.{js,ts}'],
  },
});
