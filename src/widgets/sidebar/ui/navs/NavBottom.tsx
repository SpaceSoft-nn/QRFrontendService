import { SidebarMenuGroup } from '@/shared/ui/Sidebar'
import { SidebarItems } from '../../model/sidebar.items'
import { CustomSidebarMenuList } from '../../model/sidebar.types'

export const NavBottom: React.FC<CustomSidebarMenuList> = ({ ...props }) => {
	return <SidebarMenuGroup items={SidebarItems.bottom} {...props} />
}
