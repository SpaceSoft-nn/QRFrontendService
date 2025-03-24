import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { AppSidebar } from '@/widgets/sidebar'
import { ErrorBoundary } from '@/shared/ui/error-boundary'
import { SidebarProvider } from '@/shared/ui/sidebar'
import s from './MainLayout.module.scss'

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
