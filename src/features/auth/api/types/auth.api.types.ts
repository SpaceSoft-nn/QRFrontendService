import { User } from '../../model/types/auth.types'

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials extends LoginCredentials {
	username: string
	confirmPassword: string
}

export interface AuthResponse {
	user: User
	token: string
}

export interface RefreshTokenResponse {
	token: string
}

export interface GetCurrentUserResponse {
	user: User
}
