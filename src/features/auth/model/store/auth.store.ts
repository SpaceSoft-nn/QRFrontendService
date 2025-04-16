import { makeAutoObservable } from 'mobx'
import { LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_MUTATION, REGISTER_MUTATION } from '@/features/auth/gql'
import { apolloClient } from '@/shared/api/apollo'
import { TypeLoginSchema, TypeRegisterSchema } from '../schemas'
import { AuthState } from './auth.state'

class AuthStore implements AuthState {
	accessToken: string | null = null
	isAuthenticated: boolean = false
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
		this.initializeFromStorage()
	}

	private initializeFromStorage() {
		const token = localStorage.getItem('token')
		if (token) {
			this.setAccessToken(token)
		}
	}

	setAccessToken(token: string) {
		this.accessToken = token
		this.isAuthenticated = true
		localStorage.setItem('token', token)
	}

	setLoading(loading: boolean) {
		this.loading = loading
	}

	setError(error: string | null) {
		this.error = error
	}

	async login(input: TypeLoginSchema) {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.mutate({
				mutation: LOGIN_MUTATION,
				variables: { input }
			})

			if (data?.login?.access_token) {
				this.setAccessToken(data.login.access_token)
				return true
			}

			return false
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при входе')
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async register(input: TypeRegisterSchema) {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.mutate({
				mutation: REGISTER_MUTATION,
				variables: { input }
			})

			if (data?.registration?.access_token) {
				this.setAccessToken(data.registration.access_token)
				return true
			}

			return false
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при регистрации')
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		try {
			this.setLoading(true)
			this.setError(null)

			await apolloClient.mutate({
				mutation: LOGOUT_MUTATION
			})

			this.accessToken = null
			this.isAuthenticated = false
			localStorage.removeItem('token')
			return true
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при выходе')
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async refreshToken() {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.mutate({
				mutation: REFRESH_MUTATION
			})

			if (data?.authRefresh?.access_token) {
				this.setAccessToken(data.authRefresh.access_token)
				return true
			}

			return false
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при обновлении токена')
			return false
		} finally {
			this.setLoading(false)
		}
	}
}

export const authStore = new AuthStore()
