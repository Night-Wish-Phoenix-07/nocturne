import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the built site work from any GitHub Pages address,
// so you never have to type your repository name here.
export default defineConfig({ base: './', plugins: [react()] });
