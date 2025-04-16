import { makeAutoObservable } from 'mobx'
import { authStore } from '@/features/auth'
import { OrganizationWithOpf } from '@/features/organization'
import { GET_CURRENT_USER } from '@/features/user/gql'
import { apolloClient } from '@/shared/api/apollo'
import { OrganizationTypeEnum, PersonalArea, User, Workspace } from '@/shared/api/graphql'

class UserStore {
	user: User | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
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

	get fullName(): string {
		if (!this.user) return ''
		return `${this.user.first_name} ${this.user.last_name}`
	}

	get contactInfo(): { email: string | null | undefined; phone: string | null | undefined } {
		if (!this.user) return { email: null, phone: null }
		return {
			email: this.user.email,
			phone: this.user.phone
		}
	}

	private getOrganizationType(type: OrganizationTypeEnum): string {
		switch (type) {
			case OrganizationTypeEnum.Legal:
				return 'ООО'
			case OrganizationTypeEnum.Individual:
				return 'ИП'
			default:
				return type
		}
	}

	get organizations(): OrganizationWithOpf[] {
		if (!this.user) return []
		return this.user.organizations
			?.filter(org => org !== null)
			.map(org => ({
				...org,
				nameWithOpf: `${this.getOrganizationType(org.type)} «${org.name}»`
			})) as OrganizationWithOpf[]
	}

	async getUser() {
		if (!authStore.isAuthenticated) return

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
			this.setError(error instanceof Error ? error.message : 'Ошибка при получении данных пользователя')
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		try {
			this.setLoading(true)
			this.setError(null)

			const success = await authStore.logout()
			if (success) {
				this.setUser(null)
			}

			return success
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Ошибка при выходе из системы')
			return false
		} finally {
			this.setLoading(false)
		}
	}
}

export const userStore = new UserStore()
