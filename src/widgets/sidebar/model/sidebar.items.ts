import {
	Building2,
	CreditCard,
	ExternalLink,
	FileText,
	Grid2X2,
	HelpCircle,
	History,
	Home,
	Landmark,
	Network,
	Server,
	Settings,
	Terminal,
	Users
} from 'lucide-react'
import { SidebarMenuList } from './sidebar.types'
import { urls } from '@/shared/config'

const sidebarMainMenu: SidebarMenuList[] = [
	{
		title: 'Главная',
		icon: Home,
		url: urls.dashboard.main
	},
	{
		title: 'Оплаты',
		icon: CreditCard,
		url: urls.dashboard.payments,
		subItems: [
			{
				title: 'Терминал',
				icon: Terminal,
				url: urls.dashboard.terminal
			},
			{
				title: 'История',
				icon: History,
				url: urls.dashboard.paymentsHistory
			},
			{
				title: 'Методы оплаты',
				icon: Grid2X2,
				url: urls.dashboard.paymentsMethods
			}
		]
	},
	{
		title: 'Интеграции',
		icon: Server,
		url: urls.dashboard.integrations,
		subItems: [
			{
				title: '1С',
				icon: FileText,
				url: urls.dashboard.integrations1C
			},
			{
				title: 'Банки',
				icon: Landmark,
				url: urls.dashboard.integrationsBanks
			},
			{
				title: 'Внешние',
				icon: ExternalLink,
				url: urls.dashboard.integrationsExternal
			}
		]
	},
	{
		title: 'Пользователи',
		icon: Users,
		url: urls.dashboard.users
	},
	{
		title: 'Организации',
		icon: Building2,
		url: urls.dashboard.organizations
	},
	{
		title: 'Рабочие места',
		icon: Network,
		url: urls.dashboard.workSpaces
	}
]

const sidebarBottomMenu: SidebarMenuList[] = [
	{
		title: 'Помощь',
		icon: HelpCircle,
		url: urls.dashboard.help
	},
	{
		title: 'Настройки',
		icon: Settings,
		url: urls.dashboard.settings
	}
]

export const SidebarItems = {
	main: sidebarMainMenu,
	bottom: sidebarBottomMenu
}
