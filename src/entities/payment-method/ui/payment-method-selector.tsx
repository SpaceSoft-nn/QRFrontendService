import { observer } from 'mobx-react-lite'
import { paymentMethodStore } from '@/entities/payment-method'
import { userStore } from '@/entities/user'
import { CommandUi } from '@/shared/ui'
import { CommandUiProps } from '@/shared/ui/CommandUi/CommandUi'
import { FormCommand } from '@/shared/ui/Forms'
import { FormCommandProps } from '@/shared/ui/Forms/types/Forms.types'
import { UserRoleEnum } from '@/shared/api/graphql'

interface PaymentMethodFormSelectorProps extends Pick<FormCommandProps, 'name' | 'onValueChange'> {}
interface PaymentMethodSelectorProps
	extends Pick<CommandUiProps, 'onValueChange' | 'size' | 'variant' | 'trigger' | 'align'> {}

const EMPTY_MESSAGE = 'Методы оплаты не найдены'
const PLACEHOLDER = 'Выберите метод оплаты'

export const PaymentMethodFormSelector = observer(({ ...props }: PaymentMethodFormSelectorProps) => {
	const { loading, error, paymentMethodsOptions } = paymentMethodStore
	const { user } = userStore

	if (user?.role === UserRoleEnum.Cassier) return null

	return (
		<FormCommand
			items={paymentMethodsOptions()}
			onOpen={() => paymentMethodStore.getPaymentMethods()}
			fetchError={error}
			loading={loading}
			disabled={loading}
			emptyMessage={EMPTY_MESSAGE}
			placeholder={PLACEHOLDER}
			{...props}
		/>
	)
})

export const PaymentMethodSelector = observer(({ ...props }: PaymentMethodSelectorProps) => {
	const { paymentMethodsOptions, loading, error } = paymentMethodStore
	const { user } = userStore

	if (user?.role === UserRoleEnum.Cassier) return null

	return (
		<CommandUi
			items={paymentMethodsOptions()}
			onOpen={() => paymentMethodStore.getPaymentMethods()}
			fetchError={error}
			loading={loading}
			disabled={loading}
			emptyMessage={EMPTY_MESSAGE}
			placeholder={PLACEHOLDER}
			{...props}
		/>
	)
})
