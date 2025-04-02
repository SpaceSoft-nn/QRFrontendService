import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage, SignInPage, SignUpPage } from '@/pages'
import { HomePage } from '@/pages/home'
import { MainLayout } from './layouts/main'
import { ProtectedRoute } from './protected-route'
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
				path: urls.dashboard.settings,
				element: <HomePage />
			},
			{
				path: urls.dashboard.terminal,
				element: <HomePage />
			},
			{
				path: urls.dashboard.orders,
				element: <HomePage />
			},
			{
				path: urls.dashboard.paymentHistory,
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
