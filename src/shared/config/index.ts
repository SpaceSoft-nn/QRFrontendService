export const urls = {
	dashboard: {
		main: '/',
		terminal: '/terminal',
		orders: '/orders',
		paymentHistory: '/payment_history',
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
