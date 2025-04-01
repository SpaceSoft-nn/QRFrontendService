import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage, SignInPage, SignUpPage } from '@/pages'
import { dashboardRoutes } from './dashboard-routes'
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
		children: dashboardRoutes
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
