import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Outlet />
		</>
	)
}
