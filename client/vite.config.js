import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	plugins: [
		react(),
		vitePluginImp({
			libList: [
				{
					libName: 'antd',
					style: name => `antd/es/${name}/style`,
				},
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
