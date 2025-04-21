import { makeAutoObservable, reaction } from 'mobx'
import { authStore } from '@/features/auth'
import { organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { apolloClient } from '@/shared/api'
import { User, UserCreate } from '@/shared/api/graphql'
import { CREATE_MEMBER_MUTATION, GET_MEMBERS_QUERY } from '../../gql'

class MembersStore {
	members: User[] = []
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)

		// Следим за изменением activeOrganization
		reaction(
			() => organizationStore.activeOrganization,
			activeOrganization => {
				if (activeOrganization) {
					this.getMembers()
				}
			},
			{ fireImmediately: true }
		)
	}

	setMembers = (members: User[]) => {
		this.members = members
	}

	async getMembers() {
		const { activeOrganization } = organizationStore
		if (!authStore.isAuthenticated || !activeOrganization) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query({
				query: GET_MEMBERS_QUERY,
				variables: { organizationId: activeOrganization.id }
			})

			this.setMembers(data.organization.users)
		} catch (error) {
			console.error('[getMembers] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении членов организации'
		} finally {
			this.loading = false
		}
	}

	async createMember(input: UserCreate) {
		this.loading = true
		const { activeOrganization } = organizationStore
		const { personalArea } = userStore

		if (!authStore.isAuthenticated || !activeOrganization || !personalArea) return false

		try {
			const { data } = await apolloClient.mutate({
				mutation: CREATE_MEMBER_MUTATION,
				variables: {
					input
				}
			})

			this.setMembers([...this.members, data.userCreate])
			return true
		} catch (error) {
			console.error('[createMember] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при создании члена организации'
			return false
		} finally {
			this.loading = false
		}
	}
}

export const membersStore = new MembersStore()
