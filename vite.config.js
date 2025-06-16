// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { globby } from 'globby'

const pathes = await globby('games/*.html')
console.log(pathes)
const getName = (path) => path.split('/').at(-1).replace('.html', '')

export default defineConfig({
	base: '/odyc-games/',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				...pathes.reduce(
					(prev, curr) => ({
						...prev,
						[getName(curr)]: curr,
					}),
					{},
				),
			},
		},
	},
})
