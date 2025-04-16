import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { AppSidebar } from '@/widgets/sidebar'
import { ErrorBoundary } from '@/shared/ui'
import { SidebarProvider } from '@/shared/ui/Sidebar'
import s from './dashboard-layout.module.scss'

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className={s.layout}>
			<SidebarProvider>
				<AppSidebar />
				<div className={s.layout__content}>
					<Header />
					<main>
						<ErrorBoundary>
							{children}
							<Outlet />
						</ErrorBoundary>
					</main>
				</div>
			</SidebarProvider>
		</div>
	)
}
