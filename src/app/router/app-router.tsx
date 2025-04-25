import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage, MembersPage, NotFoundPage, OrganizationsPage, ProfilePage, WorkSpacesPage } from '@/pages'
import { LoginForm, RegisterForm } from '@/features/auth'
import { WorkspaceDetails } from '@/features/workspace'
import { AuthLayout, DashboardLayout } from './layouts'
import { ProtectedRoute } from './protected-route'
import { urls } from '@/shared/config'

export const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<DashboardLayout />
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
				path: urls.dashboard.profile,
				element: <ProfilePage />
			},
			{
				path: urls.dashboard.users,
				children: [
					{
						index: true,
						element: <MembersPage />
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
						element: <OrganizationsPage />
					}
				]
			},
			{
				path: urls.dashboard.workSpaces,
				children: [
					{
						index: true,
						element: <WorkSpacesPage />
					},
					{
						path: ':workspaceId',
						element: <WorkspaceDetails />
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
			},
			{
				path: '*',
				element: <NotFoundPage withButton={false} />
			}
		]
	},
	{
		path: urls.auth.main,
		element: (
			<ProtectedRoute requireAuth={false}>
				<AuthLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: urls.auth.login,
				element: <LoginForm />
			},
			{
				path: urls.auth.register,
				element: <RegisterForm />
			},
			{
				path: '*',
				element: <Navigate to={urls.auth.login} />
			}
		]
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
])
