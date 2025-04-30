import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellIcon, ChevronRightIcon, LogOutIcon, UserCircleIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/features/auth'
import { userStore } from '@/entities/user'
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
	const navigate = useNavigate()
	const { isMobile } = useSidebar()
	const { loading, error, logout } = authStore
	const { user, getUser } = userStore

	useEffect(() => {
		getUser()
	}, [])

	const handleLogout = async () => {
		const success = await logout()
		if (success) {
			navigate(urls.auth.login, { replace: true })
		}
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							tooltip='Личный кабинет'
							loading={loading || !user || !!error}
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<UserCircleIcon />
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate'>{user?.first_name}</span>
								{user?.phone && (
									<span className='truncate text-xs text-muted-foreground'>{user?.phone}</span>
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
								<span className='truncate font-medium'>{user?.email}</span>
								{user?.phone && (
									<span className='truncate text-xs text-muted-foreground'>{user?.phone}</span>
								)}
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => navigate(urls.dashboard.profile)}>
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
