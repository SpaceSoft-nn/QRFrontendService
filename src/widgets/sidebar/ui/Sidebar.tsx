import { OrganizationSwitcher } from '@/features/organization'
import { NavUser } from '@/features/user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/shared/ui/Sidebar'
import { NavBottom } from './navs/NavBottom'
import { NavMain } from './navs/NavMain'

type AppSidebarProps = React.ComponentProps<typeof Sidebar>

export const AppSidebar: React.FC<AppSidebarProps> = ({ ...props }) => {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<OrganizationSwitcher />
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
