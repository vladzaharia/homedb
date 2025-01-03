/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
	cacheDir: '../node_modules/.vite/app',
	base: '/',

	server: {
		port: 4200,
		host: 'localhost',
		fs: {
			allow: ['../'],
		},
	},

	preview: {
		port: 4300,
		host: 'localhost',
	},

	plugins: [react(), viteTsConfigPaths(), webfontDownload()],

	define: {
		'process.env': process.env,
	},

	// test: {
	// 	globals: true,
	// 	cache: {
	// 		dir: '../node_modules/.vitest',
	// 	},
	// 	environment: 'jsdom',
	// 	include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	// 	coverage: {
	// 		provider: 'v8',
	// 		include: ['**/src/**'],
	// 		exclude: ['**/lib/**', '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	// 		reporter: ['json-summary', 'json', 'html'],
	// 	},
	// 	reporters: ['default', 'junit'],
	// 	outputFile: {
	// 		junit: '../coverage/homedb/junit.xml',
	// 	},
	// },
})
