import { Navigate, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { LoaderUi } from '@/shared/ui'
import { GET_CURRENT_USER } from '../gql/queries'
import { urls } from '@/shared/config'

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { data, loading } = useQuery(GET_CURRENT_USER)
	const location = useLocation()

	if (loading) {
		return <LoaderUi />
	}

	if (!data?.authMe) {
		return <Navigate to={urls.auth.login} state={{ from: location }} replace />
	}

	return <>{children}</>
}
