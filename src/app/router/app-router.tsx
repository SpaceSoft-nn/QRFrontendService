import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/main'
import { ProtectedRoute } from './protected-route'
import { HomePage, NotFoundPage, SignInPage, SignUpPage } from '@/Pages'
import { urls } from '@/shared/config'

export const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<MainLayout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: urls.dashboard.main,
				element: <HomePage />
			},
			{
				path: urls.dashboard.terminal,
				element: <HomePage />
			},
			{
				path: urls.dashboard.users,
				children: [
					{
						index: true,
						element: <HomePage />
					},
					{
						path: urls.dashboard.usersAdd,
						element: <HomePage />
					}
				]
			},
			{
				path: urls.dashboard.organizations,
				children: [
					{
						index: true,
						element: <HomePage />
					},
					{
						path: urls.dashboard.organizationsAdd,
						element: <HomePage />
					}
				]
			},
			{
				path: urls.dashboard.workSpaces,
				children: [
					{
						index: true,
						element: <HomePage />
					},
					{
						path: urls.dashboard.workSpacesAdd,
						element: <HomePage />
					}
				]
			},
			{
				path: urls.dashboard.payments,
				children: [
					{
						index: true,
						element: <HomePage />
					},
					{
						path: urls.dashboard.paymentsAdd,
						element: <HomePage />
					},
					{
						path: urls.dashboard.paymentsMethods,
						element: <HomePage />
					},
					{
						path: urls.dashboard.paymentsHistory,
						element: <HomePage />
					}
				]
			},
			{
				path: urls.dashboard.integrations,
				children: [
					{
						index: true,
						element: <HomePage />
					},
					{
						path: urls.dashboard.integrationsAdd,
						element: <HomePage />
					},
					{
						path: urls.dashboard.integrations1C,
						element: <HomePage />
					},
					{
						path: urls.dashboard.integrationsBanks,
						element: <HomePage />
					},
					{
						path: urls.dashboard.integrationsExternal,
						element: <HomePage />
					}
				]
			},
			{
				path: urls.dashboard.settings,
				element: <HomePage />
			},
			{
				path: urls.dashboard.help,
				element: <HomePage />
			}
		]
	},
	{
		path: urls.auth.login,
		element: (
			<ProtectedRoute requireAuth={false}>
				<SignInPage />
			</ProtectedRoute>
		)
	},
	{
		path: urls.auth.register,
		element: (
			<ProtectedRoute requireAuth={false}>
				<SignUpPage />
			</ProtectedRoute>
		)
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
])
