export const API_ROUTES = {
	auth: {
		login: '/auth/login',
		register: '/auth/register',
		logout: '/auth/logout',
		me: '/auth/me',
		refresh: '/auth/refresh'
	},
	users: {
		profile: '/users/profile',
		settings: '/users/settings'
	},
	orders: {
		list: '/orders',
		create: '/orders/create',
		details: (id: string) => `/orders/${id}`
	},
	payments: {
		history: '/payments/history',
		create: '/payments/create'
	}
} as const
