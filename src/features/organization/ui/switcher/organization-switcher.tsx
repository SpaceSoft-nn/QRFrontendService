import React, { useEffect } from 'react'
import { Building2, ChevronsUpDown } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { organizationStore, OrganizationWithOpf } from '@/entities/organization'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/Sidebar'
import { cn } from '@/shared/lib/utils'
import { OrganizationCreateForm } from '../create/organization-create-form'

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

export const OrganizationSwitcher: React.FC = observer(() => {
	const { isMobile } = useSidebar()
	const { organizations, loading, activeOrganization, setActiveOrganization } = organizationStore

	useEffect(() => {
		organizationStore.getOrganizations()
	}, [])

	useEffect(() => {
		if (organizations.length > 0 && !activeOrganization) {
			setActiveOrganization(organizations[0])
		}
	}, [organizations])

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							loading={loading}
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<OrganizationItem organization={activeOrganization} />
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='min-w-56 rounded-lg'
						align='start'
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel>Ваши организации</DropdownMenuLabel>
						{organizations.length > 0 ? (
							<>
								{organizations.map(organization => (
									<DropdownMenuItem
										key={organization.nameWithOpf}
										onClick={() => setActiveOrganization(organization)}
										className={cn(
											activeOrganization?.id === organization.id && 'bg-sidebar-accent'
										)}
									>
										{organization.nameWithOpf}
									</DropdownMenuItem>
								))}
							</>
						) : (
							<OrganizationCreateForm className='w-full' variant='ghost' size='sm' />
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
})
