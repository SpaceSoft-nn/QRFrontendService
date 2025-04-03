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

export type Urls = typeof urls
