import { CreditCard, HelpCircle, Home, ShoppingCart, Terminal } from 'lucide-react'
import { urls } from '@/shared/config'

export const SidebarItems = [
	{
		title: 'Главная',
		icon: Home,
		url: urls.dashboard.main
	},
	{
		title: 'Терминал',
		icon: Terminal,
		url: urls.dashboard.terminal
	},
	{
		title: 'Заказы',
		icon: ShoppingCart,
		url: urls.dashboard.orders
	},
	{
		title: 'История оплат',
		icon: CreditCard,
		url: urls.dashboard.paymentHistory
	},
	{
		title: 'Помощь',
		icon: HelpCircle,
		url: urls.dashboard.help
	}
]
