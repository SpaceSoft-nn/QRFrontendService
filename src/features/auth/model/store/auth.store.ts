import { makeAutoObservable, runInAction } from 'mobx'
import { authApi } from '@/features/auth/api/auth.api'
import { organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { workspaceStore } from '@/entities/workspace'
import { UserLoginInput, UserRegistration } from '@/shared/api/graphql'
import { capitalizeFullName, toast } from '@/shared/lib'

class AuthStore {
	token: string | null = null
	isAuthenticated: boolean = false
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
		this.initializeFromStorage()
	}

	private initializeFromStorage = () => {
		const token = localStorage.getItem('token')
		if (token) {
			this.setAccessToken(token)
		}
	}

	setAccessToken = (token: string) => {
		runInAction(() => {
			this.token = token
			this.isAuthenticated = true
			localStorage.setItem('token', token)
		})
	}

	removeAccessToken = () => {
		runInAction(() => {
			this.token = null
			this.isAuthenticated = false
			localStorage.removeItem('token')
		})
	}

	login = async (input: UserLoginInput) => {
		try {
			this.loading = true
			this.error = null

			const token = await authApi.login(input)

			if (token) {
				this.setAccessToken(token)
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
			runInAction(() => {
				this.loading = false
			})
		}
	}

	register = async (input: UserRegistration) => {
		this.loading = true
		this.error = null

		try {
			const token = await authApi.register({
				...input,
				...capitalizeFullName(input)
			})

			if (token) {
				this.setAccessToken(token)
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
			runInAction(() => {
				this.loading = false
			})
		}
	}

	logout = async () => {
		try {
			this.loading = true
			this.error = null

			this.removeAccessToken()

			await authApi.logout()

			runInAction(() => {
				userStore.user = null
				workspaceStore.workspaces = []
				organizationStore.organizations = []
			})

			return true
		} catch (error) {
			console.error('[logout] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при выходе'
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	refreshToken = async () => {
		try {
			this.loading = true
			this.error = null

			const token = await authApi.refreshToken()

			if (token) {
				this.setAccessToken(token)
				return true
			}

			return false
		} catch (error) {
			console.error('[refreshToken] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при обновлении токена'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const authStore = new AuthStore()
