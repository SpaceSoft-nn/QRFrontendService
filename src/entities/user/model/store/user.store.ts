import { makeAutoObservable } from 'mobx'
import { authStore } from '@/features/auth'
import { OrganizationWithOpf } from '@/entities/organization'
import { GET_CURRENT_USER } from '@/entities/user/gql'
import { apolloClient } from '@/shared/api/apollo'
import { OrganizationTypeEnum, PersonalArea, User } from '@/shared/api/graphql'

interface UserStore {
	user: User | null
	loading: boolean
	error: string | null
}

class UserStore implements UserStore {
	user: User | null = null
	personalArea: PersonalArea | null = null
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

	setPersonalArea(personalArea: PersonalArea | null) {
		this.personalArea = personalArea
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
				this.setPersonalArea(data.authMe.personalAreas[0])
				return true
			}

			return false
		} catch (error) {
			console.error('[getUser] error: ', error)
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
			console.error('[logout] error: ', error)
			this.setError(error instanceof Error ? error.message : 'Ошибка при выходе из системы')
			return false
		} finally {
			this.setLoading(false)
		}
	}
}

export const userStore = new UserStore()
