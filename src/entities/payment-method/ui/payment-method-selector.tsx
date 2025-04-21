import { observer } from 'mobx-react-lite'
import { paymentMethodStore } from '@/entities/payment-method'
import { FormCommand } from '@/shared/ui/Forms'

interface PaymentMethodSelectorProps {
	name?: string
	onValueChange?: (value: string) => void
}

export const PaymentMethodSelector = observer(
	({ name = 'payment_method_id', onValueChange }: PaymentMethodSelectorProps) => {
		const { loading, error, paymentMethodsOptions } = paymentMethodStore

		return (
			<FormCommand
				items={paymentMethodsOptions()}
				fetchError={error}
				loading={loading}
				disabled={loading}
				name={name}
				emptyMessage='Методы оплаты не найдены'
				onValueChange={onValueChange}
				placeholder='Выберите метод оплаты'
				onOpen={() => paymentMethodStore.getPaymentMethods()}
			/>
		)
	}
)
