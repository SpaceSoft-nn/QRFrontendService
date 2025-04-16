import React, { useEffect, useState } from 'react'
import { Building2, ChevronsUpDown, Plus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { OrganizationWithOpf } from '@/features/organization'
import { organizationStore } from '@/features/organization'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { useSidebar } from '@/shared/ui/Sidebar'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/Sidebar'

const OrganizationItem = ({ organization }: { organization: OrganizationWithOpf | null }) => {
	return (
		<div className='flex items-center gap-2'>
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
				<Building2 className='size-4' />
			</div>
			<div className='grid flex-1 text-left text-sm leading-tight'>
				<span className='truncate font-semibold'>{organization?.nameWithOpf || 'Нет организации'}</span>
				<span className='truncate text-xs text-muted-foreground'>
					{organization?.inn ? `ИНН ${organization.inn}` : 'Выберите организацию'}
				</span>
			</div>
		</div>
	)
}

// TODO: Добавить возможность добавлять организацию, устанавливать активную организацию
export const OrganizationSwitcher: React.FC = observer(() => {
	const { isMobile } = useSidebar()
	const { organizations, loading, error } = organizationStore
	const [activeOrganization, setActiveOrganization] = useState<(typeof organizations)[0] | null>(null)

	useEffect(() => {
		if (organizations.length > 0 && !activeOrganization) {
			setActiveOrganization(organizations[0])
		}
	}, [organizations, activeOrganization])

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							loading={loading || !!error}
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<OrganizationItem organization={activeOrganization} />
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
								{organizations.map(organization => (
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
})
