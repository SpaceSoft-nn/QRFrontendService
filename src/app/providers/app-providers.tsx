import { RouterProvider } from 'react-router-dom'
import { AppRouter } from '../router/app-router'
import { ThemeProvider } from './theme/theme-provider'

export function AppProviders() {
	return (
		<ThemeProvider>
			<RouterProvider router={AppRouter} />
		</ThemeProvider>
	)
}
