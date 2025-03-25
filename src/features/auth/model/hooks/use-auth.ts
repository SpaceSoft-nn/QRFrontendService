import { authStore } from '../store/auth.store'

export const useAuth = () => {
	return {
		isAuthenticated: authStore.isAuthenticated,
		loading: authStore.loading,
		user: authStore.user,
		error: authStore.error,
		login: authStore.login,
		register: authStore.register,
		logout: authStore.logout,
		checkAuth: authStore.checkAuth
	}
}
