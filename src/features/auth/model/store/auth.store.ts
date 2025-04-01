import { makeAutoObservable } from 'mobx'
import { apolloClient } from '@/shared/api/apollo'
import { User } from '@/shared/api/graphql'
import { LOGIN_MUTATION } from '../../gql/queries'
import { LoginSchema } from '../schemas/login.schema'
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
		const token = localStorage.getItem('access_token')
		if (token) {
			this.setAccessToken(token)
		}
	}

	setAccessToken(token: string) {
		this.accessToken = token
		this.isAuthenticated = true
		localStorage.setItem('access_token', token)
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

	async login(input: LoginSchema) {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.mutate({
				mutation: LOGIN_MUTATION,
				variables: { input }
			})

			if (data?.authLogin?.access_token) {
				this.setAccessToken(data.authLogin.access_token)
				if (data.authLogin.user) {
					this.setUser(data.authLogin.user)
				}
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

	logout() {
		this.accessToken = null
		this.user = null
		this.isAuthenticated = false
		this.error = null
		localStorage.removeItem('access_token')
	}
}

export const authStore = new AuthStore()
