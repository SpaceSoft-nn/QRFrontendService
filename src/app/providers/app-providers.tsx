import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { LoaderUi, Toaster } from '@/shared/ui'
import { apolloClient } from '@/shared/api/apollo'
import { AppRouter } from '../router/app-router'
import { ThemeProvider } from './theme/theme-provider'

export function AppProviders() {
	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider>
				<Suspense fallback={<LoaderUi className='h-screen w-screen' />}>
					<RouterProvider router={AppRouter} />
				</Suspense>
				<Toaster />
			</ThemeProvider>
		</ApolloProvider>
	)
}
