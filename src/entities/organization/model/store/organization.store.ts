import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { authStore } from '@/features/auth'
import { PartySuggestionsValue } from '@/entities/organization'
import { formatFullName, userStore } from '@/entities/user'
import { Organization, User, UserCreate } from '@/shared/api/graphql'
import { capitalizeFullName, toast } from '@/shared/lib'
import { organizationApi } from '../../api/organization.api'
import { formatOrganizationWithOpf } from '../../lib/organization.utils'
import { OrganizationWithOpf } from '../organization.types'

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

	membersOptions = () => {
		const members = this.organizationMembers.filter(member => member.id !== userStore.user?.id)

		return members.map(member => ({
			label: formatFullName(member, { initials: true }),
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
		try {
			this.loading = true
			this.error = null

			const response = await organizationApi.getOrganizations()

			runInAction(() => {
				if (response) {
					this.organizations = response.map(org => formatOrganizationWithOpf(org as Organization))
				}
			})
		} catch (error) {
			console.error('[getOrganizations] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: 'Произошла ошибка при получении организаций'
			})
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getOrganization = async (id: string) => {
		try {
			this.loading = true
			this.error = null

			const response = await organizationApi.getOrganization(id)

			runInAction(() => {
				if (response) {
					this.organizations = [...this.organizations, formatOrganizationWithOpf(response)]
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
		try {
			this.loading = true
			this.error = null

			const response = await organizationApi.createOrganization(organization)

			runInAction(() => {
				if (response) {
					this.organizations = [...this.organizations, formatOrganizationWithOpf(response)]
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

			const response = await organizationApi.getOrganizationMembers(this.activeOrganization.id)

			runInAction(() => {
				if (response) {
					this.organizationMembers = response
				}
			})
		} catch (error) {
			console.error('[getOrganizationMembers] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении пользователей'
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: this.error
			})
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

			const response = await organizationApi.createOrganizationMember({
				...input,
				...capitalizeFullName(input),
				organization_id: this.activeOrganization.id,
				personalarea_id: personalArea.id
			})

			runInAction(() => {
				if (response) {
					this.organizationMembers = [...this.organizationMembers, response]
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
