import { SidebarItems } from '@/widgets/sidebar/model/sidebar.items'
import { SidebarMenuGroup } from '@/shared/ui/Sidebar'
import { CustomSidebarMenuList } from '../../model/sidebar.types'

export const NavMain: React.FC<CustomSidebarMenuList> = ({ ...props }) => {
	return <SidebarMenuGroup items={SidebarItems.main} {...props} />
}
