import { api } from '@/shared/api'
import { API_ROUTES } from '@/shared/api/routes'
import { User } from '../model/types/auth.types'
import {
	AuthResponse,
	GetCurrentUserResponse,
	LoginCredentials,
	RefreshTokenResponse,
	RegisterCredentials
} from './types/auth.api.types'

class AuthApi {
	async login(credentials: LoginCredentials): Promise<User> {
		const { data } = await api.post<AuthResponse>(API_ROUTES.auth.login, credentials)
		localStorage.setItem('token', data.token)
		return data.user
	}

	async register(credentials: RegisterCredentials): Promise<User> {
		const { data } = await api.post<AuthResponse>(API_ROUTES.auth.register, credentials)
		localStorage.setItem('token', data.token)
		return data.user
	}

	async logout(): Promise<void> {
		await api.post(API_ROUTES.auth.logout)
		localStorage.removeItem('token')
	}

	async getCurrentUser(): Promise<User | null> {
		try {
			const { data } = await api.get<GetCurrentUserResponse>(API_ROUTES.auth.me)
			return data.user
		} catch (error) {
			return null
		}
	}

	async refreshToken(): Promise<string> {
		const { data } = await api.post<RefreshTokenResponse>(API_ROUTES.auth.refresh)
		localStorage.setItem('token', data.token)
		return data.token
	}
}

export const authApi = new AuthApi()
