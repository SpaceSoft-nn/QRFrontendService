import { makeAutoObservable } from 'mobx'
import { apolloClient } from '@/shared/api/apollo'
import { User } from '@/shared/api/graphql'
import { GET_CURRENT_USER, LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_MUTATION } from '../../gql/queries'
import { TypeLoginSchema } from '../schemas/login.schema'
import { AuthState } from './types'

class AuthStore implements AuthState {
	user: User | null = null
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

	setUser(user: User | null) {
		this.user = user
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

			if (data?.authLogin?.access_token) {
				this.setAccessToken(data.authLogin.access_token)
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

	async getUser() {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.query({
				query: GET_CURRENT_USER
			})

			if (data?.authMe) {
				this.setUser(data.authMe)
				return true
			}

			return false
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при получении данных пользователя')
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		try {
			this.setLoading(true)

			await apolloClient.mutate({
				mutation: LOGOUT_MUTATION
			})

			this.accessToken = null
			this.user = null
			this.isAuthenticated = false
			this.error = null
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
