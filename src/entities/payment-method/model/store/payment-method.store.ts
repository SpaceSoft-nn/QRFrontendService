import { makeAutoObservable, runInAction } from 'mobx'
import { SelectItem } from '@/shared/ui/Forms'
import { PaymentMethod } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { paymentMethodsApi } from '../../api/payment-methods.api'

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

			const response = await paymentMethodsApi.getPaymentMethods()

			runInAction(() => {
				if (response) {
					this.paymentMethods = response.filter(method => method !== null)
				}
			})
		} catch (error) {
			console.error('[getPaymentMethods] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении методов оплаты'
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: this.error
			})
		} finally {
			this.loading = false
		}
	}
}

export const paymentMethodStore = new PaymentMethodStore()
