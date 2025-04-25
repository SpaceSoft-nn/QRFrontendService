import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { authStore } from '@/features/auth'
import { PartySuggestionsValue } from '@/features/organization'
import { userStore } from '@/entities/user'
import { apolloClient } from '@/shared/api'
import {
	Mutation,
	Organization,
	OrganizationCreateInput,
	OrganizationTypeEnum,
	Query,
	User,
	UserCreate
} from '@/shared/api/graphql'
import { formatDateFromTimestamp, toast } from '@/shared/lib'
import {
	CREATE_ORGANIZATION_MEMBER_MUTATION,
	CREATE_ORGANIZATION_MUTATION,
	GET_ORGANIZATION_MEMBERS_QUERY,
	GET_ORGANIZATION_QUERY,
	GET_ORGANIZATIONS_QUERY
} from '../../gql'
import { formatOrganizationWithOpf } from '../../utils/format-organization-name'
import { OrganizationWithOpf } from '../types'

class OrganizationStore {
	organizations: OrganizationWithOpf[] = []
	organizationMembers: User[] = []
	activeOrganization: OrganizationWithOpf | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
		reaction(
			() => this.activeOrganization,
			() => this.getOrganizationMembers()
		)
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

	membersOptions = () => {
		return this.organizationMembers.map(member => ({
			label: `${member.last_name} ${member.first_name} ${member.father_name}`,
			description: member?.email || member?.phone || null,
			value: member.id
		}))
	}

	setActiveOrganization = (organization: OrganizationWithOpf) => {
		runInAction(() => {
			this.activeOrganization = organization
		})
	}

	getOrganizations = async () => {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'organizations'>>({
				query: GET_ORGANIZATIONS_QUERY
			})

			if (data?.organizations) {
				runInAction(() => {
					this.organizations = data.organizations.map(org => formatOrganizationWithOpf(org as Organization))
				})
			}

			return true
		} catch (error) {
			console.error('[getOrganizations] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: 'Произошла ошибка при получении организаций'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении организаций'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getOrganization = async (id: string) => {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'organization'>>({
				query: GET_ORGANIZATION_QUERY,
				variables: { id }
			})

			runInAction(() => {
				if (data?.organization) {
					this.organizations = [...this.organizations, formatOrganizationWithOpf(data.organization)]
				}
			})

			return true
		} catch (error) {
			console.error('[getOrganization] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: 'Произошла ошибка при получении организации'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении организации'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	createOrganization = async (organization: NonNullable<PartySuggestionsValue>) => {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const body = this.formatDaDataOrganization(organization)

			const { data } = await apolloClient.mutate<Pick<Mutation, 'createOrganization'>>({
				mutation: CREATE_ORGANIZATION_MUTATION,
				variables: { input: body }
			})

			runInAction(() => {
				if (data) {
					this.organizations = [...this.organizations, formatOrganizationWithOpf(data.createOrganization)]
				}
			})

			return true
		} catch (error) {
			console.error('[createOrganization] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: 'Произошла ошибка при создании организации'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при создании организации'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getOrganizationMembers = async () => {
		if (!this.activeOrganization) return false

		try {
			this.loading = true
			this.error = null
			const { data } = await apolloClient.query<Pick<Query, 'organization'>>({
				query: GET_ORGANIZATION_MEMBERS_QUERY,
				variables: { organizationId: this.activeOrganization.id }
			})

			runInAction(() => {
				this.organizationMembers = data.organization?.users || []
			})
		} catch (error) {
			console.error('[getOrganizationMembers] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при получении пользователей'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении пользователей'
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	createOrganizationMember = async (input: UserCreate) => {
		const { personalArea } = userStore
		if (!authStore.isAuthenticated || !this.activeOrganization || !personalArea) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'userCreate'>>({
				mutation: CREATE_ORGANIZATION_MEMBER_MUTATION,
				variables: {
					input: {
						...input,
						organization_id: this.activeOrganization.id,
						personalarea_id: personalArea.id
					}
				}
			})

			runInAction(() => {
				if (data) {
					this.organizationMembers = [...this.organizationMembers, data.userCreate]
					navigator.clipboard.writeText(`${input?.email || input?.phone}:${input.password}`)
					toast({
						title: 'Пользователь успешно добавлен',
						description: 'Логин и пароль пользователя скопированы в буфер обмена'
					})
				}
			})

			return true
		} catch (error) {
			console.error('[createOrganizationMember] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при создании пользователя'
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const organizationStore = new OrganizationStore()
