import { makeAutoObservable } from 'mobx'
import { SelectItem } from '@/shared/ui/Forms'
import { apolloClient } from '@/shared/api'
import { PaymentMethod } from '@/shared/api/graphql'
import { GET_PAYMENT_METHODS_QUERY } from '../../gql'

class PaymentMethodStore {
	paymentMethods: PaymentMethod[] = []
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	paymentMethodsOptions = (): SelectItem[] => {
		return this.paymentMethods.map(method => ({
			value: method.id,
			label: method.driver_name
		}))
	}

	async getPaymentMethods() {
		this.loading = true
		this.error = null

		try {
			const { data } = await apolloClient.query({
				query: GET_PAYMENT_METHODS_QUERY
			})

			this.paymentMethods = data.paymentMethods
		} catch (error) {
			console.error('[getPaymentMethods] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении методов оплаты'
		} finally {
			this.loading = false
		}
	}
}

export const paymentMethodStore = new PaymentMethodStore()
