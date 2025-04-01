import { createBrowserRouter } from 'react-router-dom'
import { HomePage, NotFoundPage, SignInPage, SignUpPage } from '@/pages'
import { MainLayout } from './layouts/main'
import { urls } from '@/shared/config'

export const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
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
		element: <SignInPage />
	},
	{
		path: urls.auth.register,
		element: <SignUpPage />
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
])
