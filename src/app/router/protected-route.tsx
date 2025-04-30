import { Navigate, useLocation } from 'react-router-dom'
import { authStore } from '@/features/auth'
import { urls } from '@/shared/config'

interface ProtectedRouteProps {
	children: React.ReactNode
	requireAuth?: boolean
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
	const location = useLocation()
	const isAuthenticated = authStore.isAuthenticated

	if (requireAuth && !isAuthenticated) {
		return <Navigate to={urls.auth.login} state={{ from: location }} replace />
	}

	if (!requireAuth && isAuthenticated) {
		return <Navigate to={urls.dashboard.main} replace />
	}

	return <>{children}</>
}
