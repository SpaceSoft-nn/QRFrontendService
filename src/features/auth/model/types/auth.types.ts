export interface User {
	id: string
	email: string
	firstName: string
	lastName: string
	phone: string
	avatar: string
}

export interface AuthState {
	isAuthenticated: boolean
	loading: boolean
	user: User | null
	error: string | null
}
