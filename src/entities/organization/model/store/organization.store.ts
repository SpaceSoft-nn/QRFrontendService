import { makeAutoObservable } from 'mobx'
import { authStore } from '@/features/auth'
import { PartySuggestionsValue } from '@/features/organization'
import { apolloClient } from '@/shared/api'
import { Organization, OrganizationCreateInput, OrganizationTypeEnum } from '@/shared/api/graphql'
import { formatDateFromTimestamp } from '@/shared/lib'
import { CREATE_ORGANIZATION_MUTATION, GET_ORGANIZATION_QUERY, GET_ORGANIZATIONS_QUERY } from '../../gql'
import { OrganizationWithOpf } from '../types'

class OrganizationStore {
	organizations: OrganizationWithOpf[] = []
	activeOrganization: OrganizationWithOpf | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setActiveOrganization = (organization: OrganizationWithOpf) => {
		this.activeOrganization = organization
	}

	setOrganizations = (organizations: OrganizationWithOpf[]) => {
		this.organizations = organizations
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

	private formatOrganizationWithOpf = (org: Organization): OrganizationWithOpf => {
		return {
			...org,
			nameWithOpf: `${this.getOrganizationType(org.type)} «${org.name}»`
		}
	}

	private formatDaDataOrganization = (value: NonNullable<PartySuggestionsValue>): OrganizationCreateInput => {
		const organization: OrganizationCreateInput = {
			address: value.data.address.value,
			inn: value.data.inn,
			name: value.data.name.full,
			registration_number: value.data.ogrn,
			okved: value.data.okved,
			type: value.data.type.toLowerCase() as OrganizationTypeEnum,
			kpp: value.data.kpp,
			founded_date: formatDateFromTimestamp(value.data.state.registration_date)
		}
		return organization
	}

	async getOrganizations() {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query({
				query: GET_ORGANIZATIONS_QUERY
			})

			this.setOrganizations(data.organizations.map(this.formatOrganizationWithOpf))

			return true
		} catch (error) {
			console.error('[getOrganizations] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении организаций'
			return false
		} finally {
			this.loading = false
		}
	}

	async getOrganization(id: string) {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query({
				query: GET_ORGANIZATION_QUERY,
				variables: { id }
			})

			this.setOrganizations([...this.organizations, this.formatOrganizationWithOpf(data.organization)])

			return true
		} catch (error) {
			console.error('[getOrganization] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении организации'
			return false
		} finally {
			this.loading = false
		}
	}

	async createOrganization(organization: NonNullable<PartySuggestionsValue>) {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			if (!organization) return false

			const organizationInput = this.formatDaDataOrganization(organization)

			const { data } = await apolloClient.mutate({
				mutation: CREATE_ORGANIZATION_MUTATION,
				variables: { input: organizationInput }
			})

			this.setOrganizations([...this.organizations, this.formatOrganizationWithOpf(data.createOrganization)])

			return true
		} catch (error) {
			console.error('[createOrganization] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при создании организации'
			return false
		} finally {
			this.loading = false
		}
	}
}

export const organizationStore = new OrganizationStore()
