/** @type {import('tailwindcss').Config} */
const { createThemes } = require('tw-colors');
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {


				keyframes: {
					'linaerwidth': {
						'0%': { width: '0%' },
						'30%': { width: '80%' },
						'100%': { width: '100%' },
					},
					'linear-width': {
						'0%': { width: '100%' },
						'30%': { width: '60%' },
						'100%': { width: '0%' },
					}
				},
				animation: {
					'linearwidth': 'linaerwidth 1s linear ',
					'linear-width': 'linear-width 1s linear '
				},

		},
	},
	plugins: [
		createThemes({
			forest: { 
				'primary': '#EDEDED',
				'secondary': '#DA0037',
				'brand': '#444444',
				'accent': '#171717',},
		}),
	],
}
