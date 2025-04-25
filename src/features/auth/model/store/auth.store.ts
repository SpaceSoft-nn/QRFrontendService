import { makeAutoObservable } from 'mobx'
import { LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_MUTATION, REGISTER_MUTATION } from '@/features/auth/gql'
import { organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { workspaceStore } from '@/entities/workspace'
import { apolloClient } from '@/shared/api/apollo'
import { Mutation, UserLogin, UserRegistration } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'

interface Token {
	accessToken: string
	expiresInAccess?: number
	expiresInRefresh?: number
}

class AuthStore {
	token: Token | null = null
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
			this.setAccessToken({
				accessToken: token
			})
		}
	}

	setAccessToken(token: Token) {
		this.token = token
		this.isAuthenticated = true
		localStorage.setItem('token', token.accessToken)
	}

	removeAccessToken() {
		this.token = null
		this.isAuthenticated = false
		localStorage.removeItem('token')
	}

	login = async (input: UserLogin) => {
		this.loading = true
		this.error = null

		try {
			const { data } = await apolloClient.mutate<Pick<Mutation, 'login'>>({
				mutation: LOGIN_MUTATION,
				variables: { input }
			})

			if (data?.login.access_token) {
				this.setAccessToken({
					accessToken: data.login.access_token,
					expiresInAccess: Number(data.login.expires_in_access),
					expiresInRefresh: Number(data.login.expires_in_refresh)
				})
				return true
			}

			return false
		} catch (error) {
			console.error('[login] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при входе'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при входе'
			return false
		} finally {
			this.loading = false
		}
	}

	register = async (input: UserRegistration) => {
		this.loading = true
		this.error = null

		try {
			const { data } = await apolloClient.mutate<Pick<Mutation, 'registration'>>({
				mutation: REGISTER_MUTATION,
				variables: { input }
			})

			if (data?.registration?.access_token) {
				this.setAccessToken({
					accessToken: data.registration.access_token,
					expiresInAccess: Number(data.registration.expires_in_access),
					expiresInRefresh: Number(data.registration.expires_in_refresh)
				})
				return true
			}

			return false
		} catch (error) {
			console.error('[register] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при регистрации'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при регистрации'
			return false
		} finally {
			this.loading = false
		}
	}

	logout = async () => {
		this.loading = true
		this.error = null

		try {
			this.removeAccessToken()

			await apolloClient.mutate({
				mutation: LOGOUT_MUTATION
			})

			workspaceStore.workspaces = []
			organizationStore.organizations = []

			return true
		} catch (error) {
			console.error('[logout] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при выходе'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при выходе'
			return false
		} finally {
			this.loading = false
		}
	}

	refreshToken = async () => {
		this.loading = true
		this.error = null

		try {
			const { data } = await apolloClient.mutate<Pick<Mutation, 'authRefresh'>>({
				mutation: REFRESH_MUTATION
			})

			if (data?.authRefresh?.access_token) {
				this.setAccessToken({
					accessToken: data.authRefresh.access_token,
					expiresInAccess: Number(data.authRefresh.expires_in_access),
					expiresInRefresh: Number(data.authRefresh.expires_in_refresh)
				})
				return true
			}

			return false
		} catch (error) {
			console.error('[refreshToken] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при обновлении токена'
			await this.logout()
			return false
		} finally {
			this.loading = false
		}
	}
}

export const authStore = new AuthStore()
