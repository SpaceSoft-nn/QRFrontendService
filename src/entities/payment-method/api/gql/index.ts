import { gql } from '@apollo/client'
import { PAYMENT_METHOD_BASE_FRAGMENT } from '@/shared/api/fragments'

export const GET_PAYMENT_METHODS_QUERY = gql`
	query GetPaymentMethods {
		paymentMethods {
			...PaymentMethodBaseFragment
		}
	}
	${PAYMENT_METHOD_BASE_FRAGMENT}
`
