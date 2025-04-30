import { apolloClient } from '@/shared/api'
import { Mutation, Query, UserCreate } from '@/shared/api/graphql'
import { formatDaDataOrganization } from '../lib/organization.utils'
import { PartySuggestionsValue } from '../model/organization.types'
import {
	CREATE_ORGANIZATION_MEMBER_MUTATION,
	CREATE_ORGANIZATION_MUTATION,
	GET_ORGANIZATION_MEMBERS_QUERY,
	GET_ORGANIZATION_QUERY,
	GET_ORGANIZATIONS_QUERY
} from './gql'

export const organizationApi = {
	getOrganizations: async () => {
		const { data } = await apolloClient.query<Pick<Query, 'organizations'>>({
			query: GET_ORGANIZATIONS_QUERY
		})

		return data?.organizations
	},

	getOrganization: async (id: string) => {
		const { data } = await apolloClient.query<Pick<Query, 'organization'>>({
			query: GET_ORGANIZATION_QUERY,
			variables: { id }
		})

		return data?.organization
	},

	createOrganization: async (organization: NonNullable<PartySuggestionsValue>) => {
		const input = formatDaDataOrganization(organization)

		const { data } = await apolloClient.mutate<Pick<Mutation, 'createOrganization'>>({
			mutation: CREATE_ORGANIZATION_MUTATION,
			variables: { input }
		})

		return data?.createOrganization
	},

	getOrganizationMembers: async (organizationId: string) => {
		const { data } = await apolloClient.query<Pick<Query, 'organization'>>({
			query: GET_ORGANIZATION_MEMBERS_QUERY,
			variables: { organizationId }
		})

		return data.organization?.users
	},

	createOrganizationMember: async (input: UserCreate) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'userCreate'>>({
			mutation: CREATE_ORGANIZATION_MEMBER_MUTATION,
			variables: { input }
		})

		return data?.userCreate
	}
}
