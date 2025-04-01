import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '@/shared/ui/error-boundary'

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Outlet />
		</>
	)
}
