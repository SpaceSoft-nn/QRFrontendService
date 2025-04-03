export const urls = {
	dashboard: {
		main: '/',
		terminal: '/terminal',

		users: '/users',
		usersAdd: '/users' + '/add',

		organizations: '/organizations',
		organizationsAdd: '/organizations' + '/add',

		workSpaces: '/work_spaces',
		workSpacesAdd: '/work_spaces' + '/add',

		payments: '/payments',
		paymentsAdd: '/payments' + '/add',
		paymentsHistory: '/payments' + '/history',
		paymentsMethods: '/payments' + '/methods',

		integrations: '/integrations',
		integrationsAdd: '/integrations' + '/add',
		integrationsBanks: '/integrations' + '/banks',
		integrations1C: '/integrations' + '/1c',
		integrationsExternal: '/integrations' + '/external',

		settings: '/settings',
		help: '/help'
	},
	auth: {
		login: '/login',
		register: '/register',
		verify: '/register_verify',
		forgotPassword: '/forgot_password'
	}
} as const

type UrlPaths = typeof urls.dashboard

export const urlLabels: Record<keyof UrlPaths, string> = {
	main: 'Главная',
	terminal: 'Терминал',

	users: 'Пользователи',
	usersAdd: 'Добавление',

	organizations: 'Организации',
	organizationsAdd: 'Добавление',

	workSpaces: 'АРМ',
	workSpacesAdd: 'Добавление АРМ',

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
