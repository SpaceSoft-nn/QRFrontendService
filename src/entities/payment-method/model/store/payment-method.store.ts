import { makeAutoObservable } from 'mobx'
import { SelectItem } from '@/shared/ui/Forms'
import { apolloClient } from '@/shared/api'
import { PaymentMethod, Query } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { GET_PAYMENT_METHODS_QUERY } from '../../gql'

class PaymentMethodStore {
	paymentMethods: PaymentMethod[] | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	paymentMethodsOptions = (): SelectItem[] => {
		return (
			this.paymentMethods?.map(method => ({
				value: method.id,
				label: method.driver_name
			})) || []
		)
	}

	getPaymentMethods = async () => {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'paymentMethods'>>({
				query: GET_PAYMENT_METHODS_QUERY
			})

			if (data) {
				this.paymentMethods = data.paymentMethods.map(method => method as PaymentMethod)
			}
		} catch (error) {
			console.error('[getPaymentMethods] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: 'Произошла ошибка при получении методов оплаты'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении методов оплаты'
		} finally {
			this.loading = false
		}
	}
}

export const paymentMethodStore = new PaymentMethodStore()
