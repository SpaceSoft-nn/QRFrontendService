import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellIcon, ChevronRightIcon, LogOutIcon, UserCircleIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/features/auth'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/Sidebar'
import { urls } from '@/shared/config'

export const NavUser: React.FC = observer(() => {
	const { isMobile } = useSidebar()
	const navigate = useNavigate()

	useEffect(() => {
		if (!authStore.user && authStore.isAuthenticated) {
			authStore.getUser()
		}
	}, [authStore.isAuthenticated])

	const handleLogout = async () => {
		await authStore.logout()
		navigate(urls.auth.login)
	}

	if (!authStore.user && !authStore.loading) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							tooltip='Личный кабинет'
							loading={authStore.loading || !authStore.user}
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<UserCircleIcon />
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate'>{authStore.user?.email}</span>
								{authStore.user?.phone && (
									<span className='truncate text-xs text-muted-foreground'>
										{authStore.user.phone}
									</span>
								)}
							</div>
							<ChevronRightIcon className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='font-normal'>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{authStore.user?.email}</span>
								{authStore.user?.phone && (
									<span className='truncate text-xs text-muted-foreground'>
										{authStore.user.phone}
									</span>
								)}
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<UserCircleIcon className='mr-2 size-4' />
								Профиль
							</DropdownMenuItem>
							<DropdownMenuItem>
								<BellIcon className='mr-2 size-4' />
								Уведомления
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOutIcon className='mr-2 size-4' />
							Выйти
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
})
