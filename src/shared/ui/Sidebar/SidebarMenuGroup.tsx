import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Plus } from 'lucide-react'
import { SidebarMenuList } from '@/widgets/sidebar/model/sidebar.types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui'
import {
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/shared/ui/Sidebar'

interface SidebarMenuGroupProps extends React.ComponentProps<typeof SidebarGroup> {
	title?: string
	items: SidebarMenuList[]
	actionTitle?: string
	showAction?: boolean
	action?: React.ReactNode
	className?: string
}

export const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
	title,
	actionTitle,
	items,
	showAction = false,
	action,
	className,
	...props
}) => {
	const location = useLocation()

	return (
		<SidebarGroup className={className} {...props}>
			{title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
			{showAction && (
				<SidebarGroupAction title={actionTitle}>
					{action || (
						<>
							<Plus /> <span className='sr-only'>{actionTitle}</span>
						</>
					)}
				</SidebarGroupAction>
			)}
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map(item => {
						if (item.subItems?.length) {
							return (
								<Collapsible
									key={item.title}
									title={item.title}
									asChild
									defaultOpen={location.pathname === item.url}
									className='group/collapsible'
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												asChild
												isActive={location.pathname === item.url}
												tooltip={item.title}
											>
												<Link to={item.url}>
													{item.icon && <item.icon />}
													<span>{item.title}</span>
													<ChevronDown className='ml-auto -rotate-90 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-0' />
												</Link>
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.subItems.map(subItem => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															asChild
															isActive={location.pathname === subItem.url}
														>
															<Link to={subItem.url}>
																{subItem.icon && <subItem.icon />}
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							)
						}

						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									isActive={location.pathname === item.url}
									tooltip={item.title}
								>
									<Link to={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
