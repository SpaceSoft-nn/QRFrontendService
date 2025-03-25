import { makeAutoObservable, runInAction } from 'mobx'
import { authApi } from '../../api'
import { LoginCredentials, RegisterCredentials } from '../../api/types/auth.api.types'
import { AuthState, User } from '../../model/types/auth.types'

class AuthStore implements AuthState {
	isAuthenticated = false
	loading = false
	user: User | null = null
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setLoading = (loading: boolean) => {
		this.loading = loading
	}

	setError = (error: string | null) => {
		this.error = error
	}

	setUser = (user: User | null) => {
		this.user = user
		this.isAuthenticated = !!user
	}

	login = async (credentials: LoginCredentials) => {
		try {
			this.setLoading(true)
			this.setError(null)
			const user = await authApi.login(credentials)
			runInAction(() => {
				this.setUser(user)
			})
			return true
		} catch (error) {
			runInAction(() => {
				this.setError(error instanceof Error ? error.message : 'Ошибка авторизации')
			})
			return false
		} finally {
			runInAction(() => {
				this.setLoading(false)
			})
		}
	}

	register = async (credentials: RegisterCredentials) => {
		try {
			this.setLoading(true)
			this.setError(null)
			const user = await authApi.register(credentials)
			runInAction(() => {
				this.setUser(user)
			})
			return true
		} catch (error) {
			runInAction(() => {
				this.setError(error instanceof Error ? error.message : 'Ошибка регистрации')
			})
			return false
		} finally {
			runInAction(() => {
				this.setLoading(false)
			})
		}
	}

	logout = async () => {
		try {
			this.setLoading(true)
			this.setError(null)
			await authApi.logout()
			runInAction(() => {
				this.setUser(null)
			})
			return true
		} catch (error) {
			runInAction(() => {
				this.setError(error instanceof Error ? error.message : 'Ошибка выхода')
			})
			return false
		} finally {
			runInAction(() => {
				this.setLoading(false)
			})
		}
	}

	checkAuth = async () => {
		try {
			this.setLoading(true)
			this.setError(null)
			const user = await authApi.getCurrentUser()
			runInAction(() => {
				this.setUser(user)
			})
			return true
		} catch (error) {
			runInAction(() => {
				this.setError(error instanceof Error ? error.message : 'Ошибка проверки авторизации')
			})
			return false
		} finally {
			runInAction(() => {
				this.setLoading(false)
			})
		}
	}
}

export const authStore = new AuthStore()
