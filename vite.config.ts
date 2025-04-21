import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	preview: {
		port: 8080,
		strictPort: true
	},
	server: {
		port: 4000,
		open: true
	},
	build: {
		chunkSizeWarningLimit: 500,
		rollupOptions: {
			output: {
				manualChunks: {
					'vendor-react': ['react', 'react-dom'],
					'vendor-dadata': ['react-dadata'],
					'vendor-ui': [
						'@radix-ui/react-accordion',
						'@radix-ui/react-checkbox',
						'@radix-ui/react-dialog',
						'@radix-ui/react-dropdown-menu',
						'@radix-ui/react-label',
						'@radix-ui/react-popover',
						'@radix-ui/react-scroll-area',
						'@radix-ui/react-select',
						'@radix-ui/react-separator',
						'@radix-ui/react-slot',
						'@radix-ui/react-switch',
						'@radix-ui/react-tabs',
						'@radix-ui/react-toast',
						'@radix-ui/react-tooltip',
						'@radix-ui/react-collapsible',
						'shadcn',
						'lucide-react',
						'react-icons',
						'react-table',
						'react-day-picker',
						'framer-motion'
					],
					'vendor-gql': ['@apollo/client', 'graphql']
				}
			}
		}
	}
})
