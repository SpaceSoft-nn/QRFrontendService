import { makeAutoObservable, runInAction } from 'mobx'
import { authStore } from '@/features/auth'
import { PersonalArea, User } from '@/shared/api/graphql'
import { userApi } from '../../api/user.api'

class UserStore {
	user: User | null = null
	personalArea: PersonalArea | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	getUser = async () => {
		if (!authStore.isAuthenticated) return

		try {
			this.loading = true
			this.error = null

			const response = await userApi.getCurrentUser()

			runInAction(() => {
				if (response) {
					this.user = response
					this.personalArea = response.personalAreas.find(area => area.owner.id === response?.id) || null
				}
			})
		} catch (error) {
			console.error('[getUser] error: ', error)
			this.error = error instanceof Error ? error.message : 'Ошибка при получении данных пользователя'
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const userStore = new UserStore()
