import { User } from '@/shared/api/graphql'

export interface AuthState {
	user: User | null
	accessToken: string | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}
