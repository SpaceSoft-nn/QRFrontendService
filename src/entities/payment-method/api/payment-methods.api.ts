import { apolloClient } from '@/shared/api'
import { Query } from '@/shared/api/graphql'
import { GET_PAYMENT_METHODS_QUERY } from './gql'

export const paymentMethodsApi = {
	getPaymentMethods: async () => {
		const { data } = await apolloClient.query<Pick<Query, 'paymentMethods'>>({
			query: GET_PAYMENT_METHODS_QUERY
		})

		return data?.paymentMethods
	}
}
