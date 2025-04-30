import { apolloClient } from '@/shared/api'
import { DriverInfoInput, Mutation, Query } from '@/shared/api/graphql'
import { CREATE_INTEGRATION_MUTATION, GET_INTEGRATION_QUERY, GET_INTEGRATIONS_QUERY } from './gql'

export const integrationApi = {
	getIntegrations: async () => {
		const { data } = await apolloClient.query<Pick<Query, 'driverInfosByUser'>>({
			query: GET_INTEGRATIONS_QUERY
		})

		return data?.driverInfosByUser.filter(integration => integration !== null)
	},

	getIntegration: async (id: string) => {
		const { data } = await apolloClient.query<Pick<Query, 'driverInfoById'>>({
			query: GET_INTEGRATION_QUERY,
			variables: { id }
		})

		return data?.driverInfoById
	},

	createIntegration: async (input: DriverInfoInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'createDriverInfo'>>({
			mutation: CREATE_INTEGRATION_MUTATION,
			variables: { input }
		})

		return data?.createDriverInfo
	}
}
