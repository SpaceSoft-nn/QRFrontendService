import { makeAutoObservable, runInAction } from 'mobx'
import { authStore } from '@/features/auth'
import { GET_CURRENT_USER } from '@/entities/user/gql'
import { apolloClient } from '@/shared/api/apollo'
import { PersonalArea, Query, User } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'

class UserStore {
	user: User | null = null
	personalArea: PersonalArea | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get fullName(): string {
		if (!this.user) return ''
		return `${this.user.first_name} ${this.user.last_name}`
	}

	get contactInfo(): Pick<User, 'email' | 'phone'> {
		if (!this.user) return { email: null, phone: null }
		return {
			email: this.user.email,
			phone: this.user.phone
		}
	}

	async getUser() {
		if (!authStore.isAuthenticated) return

		try {
			this.loading = true
			this.error = null
			const { data } = await apolloClient.query<Pick<Query, 'authMe'>>({
				query: GET_CURRENT_USER
			})

			runInAction(() => {
				if (data && data.authMe) {
					this.user = data.authMe
					this.personalArea =
						data.authMe.personalAreas.find(area => area.owner.id === data.authMe?.id) || null
				}
			})

			return false
		} catch (error) {
			console.error('[getUser] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: 'Произошла ошибка при получении данных пользователя'
			})
			this.error = error instanceof Error ? error.message : 'Ошибка при получении данных пользователя'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	async logout() {
		try {
			this.loading = true
			this.error = null

			const success = await authStore.logout()
			if (success) {
				runInAction(() => {
					this.user = null
				})
			}

			return success
		} catch (error) {
			console.error('[logout] error: ', error)
			this.error = error instanceof Error ? error.message : 'Ошибка при выходе из системы'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const userStore = new UserStore()
