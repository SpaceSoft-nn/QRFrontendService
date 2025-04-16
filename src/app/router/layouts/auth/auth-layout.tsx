import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '@/shared/ui'
import s from './auth-layout.module.scss'

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className={s.auth__layout}>
			<ErrorBoundary>
				{children}
				<Outlet />
			</ErrorBoundary>
		</div>
	)
}
