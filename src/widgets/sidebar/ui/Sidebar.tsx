import { NavUser } from '@/features/nav-user'
import { OrganizationSwitcher } from '@/features/organization-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/shared/ui/Sidebar'
import { NavBottom } from './navs/NavBottom'
import { NavMain } from './navs/NavMain'

const organizations = [
	{ id: '1', name: 'ООО «Рога и копыта»', role: 'Администратор' },
	{ id: '2', name: 'ООО «Копыта и рога»', role: 'Пользователь' },
	{ id: '3', name: 'ООО «Агропром»', role: 'Пользователь' }
]

type AppSidebarProps = React.ComponentProps<typeof Sidebar>

export const AppSidebar: React.FC<AppSidebarProps> = ({ ...props }) => {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<OrganizationSwitcher organizations={organizations} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				<NavBottom className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
