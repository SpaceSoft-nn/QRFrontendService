import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellIcon, ChevronRightIcon, LogOutIcon, UserCircleIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { authStore } from '@/features/auth'
import { userStore } from '@/features/user'
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

	const { loading, error, isAuthenticated } = authStore
	const { fullName, contactInfo } = userStore

	useEffect(() => {
		if (isAuthenticated) {
			userStore.getUser()
		}
	}, [isAuthenticated])

	const handleLogout = async () => {
		const success = await userStore.logout()
		if (success) {
			navigate(urls.auth.login)
		}
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							tooltip='Личный кабинет'
							loading={loading || !userStore.user || !!error}
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<UserCircleIcon />
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate'>{fullName}</span>
								{contactInfo.phone && (
									<span className='truncate text-xs text-muted-foreground'>{contactInfo.phone}</span>
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
								<span className='truncate font-medium'>{contactInfo.email}</span>
								{contactInfo.phone && (
									<span className='truncate text-xs text-muted-foreground'>{contactInfo.phone}</span>
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
