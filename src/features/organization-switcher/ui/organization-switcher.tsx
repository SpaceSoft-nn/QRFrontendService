import { useState } from 'react'
import { Building2, ChevronsUpDown, Plus } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { useSidebar } from '@/shared/ui/sidebar'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar'

export const OrganizationSwitcher: React.FC<{ organizations?: { id: string; name: string; role: string }[] }> = ({
	organizations = []
}) => {
	const { isMobile } = useSidebar()
	const [activeOrganization, setActiveOrganization] = useState<(typeof organizations)[0] | null>(
		organizations[0] || null
	)

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
								<Building2 className='size-4' />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>
									{activeOrganization?.name || 'Нет организации'}
								</span>
								<span className='truncate text-xs text-muted-foreground'>
									{activeOrganization?.role || 'Создайте организацию'}
								</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						align='start'
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className='text-xs text-muted-foreground'>Организации</DropdownMenuLabel>
						{organizations.length > 0 ? (
							<>
								{organizations.map((organization, index) => (
									<DropdownMenuItem
										key={organization.name}
										onClick={() => setActiveOrganization(organization)}
									>
										{organization.name}
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
							</>
						) : null}
						<DropdownMenuItem className='gap-2 p-1'>
							<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
								<Plus className='size-4' />
							</div>
							<div className='font-medium text-muted-foreground'>Добавить организацию</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
