import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			workbox: {
				navigateFallbackDenylist: [/^\/api*/],
				maximumFileSizeToCacheInBytes: 3000000,
				runtimeCaching: [
					{
						urlPattern: ({ url }) => url.pathname.startsWith('/api'),
						handler: 'NetworkOnly',
					},
				],
			},
			manifest: {
				name: 'Gluten Cero',
				short_name: 'Gluten Cero',
				theme_color: '#ffffff',
				icons: [{
					src: '/android-chrome-192x192.png',
					sizes:'192x192',
					type:'image/png',
					purpose:'favicon'
				},
				{
					src:'/android-chrome-512x512.png',
					sizes:'512x512',
					type:'image/png',
					purpose:'favicon'
				},
				{
					src: '/apple-touch-icon.png',
					sizes:'180x180',
					type:'image/png',
					purpose:'apple touch icon',
				},
				{
					src: '/maskable_icon.png',
					sizes:'512x512',
					type:'image/png',
					purpose:'any maskable',
				}
			],
			},
			theme_color:'#171717',
			background_color:'#f0e7db',
			display:"standalone",
			scope:'/',
			start_url:"/",
			orientation:'portrait'
		}),
		vitePluginImp({
			libList: [
				{
					libName: 'antd',
					style: name => `antd/es/${name}/style`,
				},
				{
					libName: 'underscore',
					libDirectory: '',
					camel2DashComponentName: false
				}
			],
		}),
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				// modifyVars: {
				//   'primary-color': '#1DA57A',
				//  'heading-color': '#f00',
				// }
			},
		},
	},
});
