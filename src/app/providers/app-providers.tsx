import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/shared/ui'
import { AppRouter } from '../router/app-router'
import { ThemeProvider } from './theme/theme-provider'

export function AppProviders() {
	return (
		<ThemeProvider>
			<RouterProvider router={AppRouter} />
			<Toaster />
		</ThemeProvider>
	)
}
