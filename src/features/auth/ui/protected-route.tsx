import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../model/hooks/use-auth'
import { urls } from '@/shared/config'

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, loading } = useAuth()
	const location = useLocation()

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (!isAuthenticated) {
		return <Navigate to={urls.auth.login} state={{ from: location }} replace />
	}

	return <>{children}</>
}
