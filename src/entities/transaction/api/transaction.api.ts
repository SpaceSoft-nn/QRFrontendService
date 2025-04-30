import { apolloClient } from '@/shared/api'
import { CreateTransactionInput, Mutation } from '@/shared/api/graphql'
import { CREATE_TRANSCATION_MUTATION } from './gql'

export const transactionApi = {
	createTransaction: async (input: CreateTransactionInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'createTransaction'>>({
			mutation: CREATE_TRANSCATION_MUTATION,
			variables: { input }
		})

		return data?.createTransaction
	}
}
