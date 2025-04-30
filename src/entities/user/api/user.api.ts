import { apolloClient } from '@/shared/api'
import { Query } from '@/shared/api/graphql'
import { GET_CURRENT_USER } from './gql'

export const userApi = {
	getCurrentUser: async () => {
		const { data } = await apolloClient.query<Pick<Query, 'authMe'>>({
			query: GET_CURRENT_USER
		})

		return data?.authMe
	}
}
