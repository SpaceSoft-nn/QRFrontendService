import { RouteObject } from 'react-router-dom'
import { HomePage } from '@/pages'
import { urls } from '@/shared/config'

export const dashboardRoutes: RouteObject[] = [
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
