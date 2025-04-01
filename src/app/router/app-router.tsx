import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/main'
import { ProtectedRoute } from './protected-route'
import { urls } from '@/shared/config'

const NotFoundPage = lazy(() =>
	import('@/pages/not-found/NotFoundPage').then(module => ({ default: module.NotFoundPage }))
)
const SignInPage = lazy(() => import('@/pages/auth/SignInPage').then(module => ({ default: module.SignInPage })))
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage').then(module => ({ default: module.SignUpPage })))
const HomePage = lazy(() => import('@/pages/home/HomePage').then(module => ({ default: module.HomePage })))

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
