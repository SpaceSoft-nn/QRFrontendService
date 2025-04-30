import { gql } from '@apollo/client'
import { TRANSACTION_FRAGMENT } from '@/shared/api/fragments'

export const CREATE_TRANSCATION_MUTATION = gql`
	mutation CreateTransaction($input: CreateTransactionInput!) {
		createTransaction(input: $input) {
			...TransactionFragment
		}
	}
	${TRANSACTION_FRAGMENT}
`
