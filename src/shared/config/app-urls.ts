import { slugify } from '../lib/utils'

export const urls = {
	dashboard: {
		main: '/',
		terminal: '/terminal',

		profile: '/profile',

		users: '/users',
		usersAdd: '/users' + '/add',

		organizations: '/organizations',
		organizationById: (id: string) => `/organizations/${id}`,

		workSpaces: '/workspaces',
		workSpaceBySlug: (slug: string) => `/workspaces/${slugify(slug)}`,
		workSpaceById: (id: string) => `/workspaces/${id}`,

		payments: '/payments',
		paymentsHistory: '/payments' + '/history',
		paymentsMethods: '/payments' + '/methods',

		integrations: '/integrations',
		integrationsBanks: '/integrations' + '/banks',
		integrations1C: '/integrations' + '/1c',
		integrationsExternal: '/integrations' + '/external',

		settings: '/settings',
		help: '/help'
	},
	auth: {
		main: '/auth',
		login: '/auth/login',
		register: '/auth/register',
		verify: '/auth/register_verify',
		forgotPassword: '/auth/forgot_password'
	}
} as const

type UrlPaths = typeof urls.dashboard

export const urlLabels: Record<string, string> = {
	main: 'Главная',
	terminal: 'Терминал',

	profile: 'Профиль',

	users: 'Пользователи',
	usersAdd: 'Добавление',

	organizations: 'Организации',
	organizationsAdd: 'Добавление',

	workSpaces: 'АРМ',
	workSpacesAdd: 'Создание',

	payments: 'Оплаты',
	paymentsAdd: 'Создание',
	paymentsHistory: 'История',
	paymentsMethods: 'Методы',

	integrations: 'Интеграции',
	integrationsAdd: 'Добавление',
	integrationsBanks: 'Банки',
	integrations1C: '1С',
	integrationsExternal: 'Внешние',

	settings: 'Настройки',
	help: 'Помощь'
}

export type Urls = typeof urls
