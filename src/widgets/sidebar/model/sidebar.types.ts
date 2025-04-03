import type { LucideIcon } from 'lucide-react'
import type { SidebarMenuGroup } from '@/shared/ui/Sidebar'

interface SidebarMenuItem {
	title: string
	url: string
	icon?: LucideIcon
	isActive?: boolean
}

interface SidebarSubMenuList {
	subItems?: SidebarMenuItem[]
}

export interface SidebarMenuList extends SidebarSubMenuList, SidebarMenuItem {}

export type CustomSidebarMenuList = Omit<
	React.ComponentProps<typeof SidebarMenuGroup>,
	'items' | 'title' | 'actionTitle' | 'showAction'
>
