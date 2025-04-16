import { makeAutoObservable } from 'mobx'
import { authStore } from '@/features/auth'
import { apolloClient } from '@/shared/api'
import { Organization, OrganizationTypeEnum } from '@/shared/api/graphql'
import { GET_ORGANIZATIONS_QUERY } from '../../gql'
import { OrganizationWithOpf } from '../types'

class OrganizationStore {
	organizations: OrganizationWithOpf[] = []
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
		this.getOrganizations()
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

	private formatOrganization = (org: Organization): OrganizationWithOpf => {
		return {
			...org,
			nameWithOpf: `${this.getOrganizationType(org.type)} «${org.name}»`
		}
	}

	async getOrganizations() {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query({
				query: GET_ORGANIZATIONS_QUERY
			})

			this.organizations = data.organizations.map(this.formatOrganization)

			return true
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении организаций'
			return false
		} finally {
			this.loading = false
		}
	}
}

export const organizationStore = new OrganizationStore()
