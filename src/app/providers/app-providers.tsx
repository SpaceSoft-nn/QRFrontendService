import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { BreadcrumbsProvider } from '@/features/breadcrumbs'
import { Toaster } from '@/shared/ui'
import { apolloClient } from '@/shared/api/apollo'
import { AppRouter } from '../router/app-router'
import { ThemeProvider } from './theme/theme-provider'

export function AppProviders() {
	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider>
				<BreadcrumbsProvider>
					<RouterProvider router={AppRouter} />
					<Toaster />
				</BreadcrumbsProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}
