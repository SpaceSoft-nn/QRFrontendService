import { Link, useLocation } from 'react-router-dom'
import { NavUser } from '@/features/nav-user'
import { OrganizationSwitcher } from '@/features/organization-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/sidebar'
import { SidebarItems } from '../model/sidebar.items'

const organizations = [
	{ id: '1', name: 'ООО «Рога и копыта»', role: 'Администратор' },
	{ id: '2', name: 'ООО «Копыта и рога»', role: 'Пользователь' },
	{ id: '3', name: 'ООО «Агропром»', role: 'Пользователь' }
]

export const AppSidebar: React.FC = () => {
	const location = useLocation()

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<OrganizationSwitcher organizations={organizations} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Навигация</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{SidebarItems.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={location.pathname === item.url}
										tooltip={item.title}
									>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
