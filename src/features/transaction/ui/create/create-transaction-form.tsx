import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionStore } from '@/entities/transaction'
import { TextGenerateEffect } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Form, FormInput } from '@/shared/ui/Forms'
import { CreateTransactionInput } from '@/shared/api/graphql'
import { QrCodePayment } from '../qr-code/qr-code-payment'
import { createTransactionSchema } from './create-transcation.schema'

interface CreateTransactionFormProps {
	workspaceId: string
}

const AdditionalTransactionFields = () => {
	return (
		<>
			<FormInput name='type_product' placeholder='Тип продукта' />
			<FormInput name='count_product' type='number' placeholder='Количество продукта' />
			<FormInput name='name_product' placeholder='Название продукта' />
		</>
	)
}

export const CreateTransactionForm = observer<CreateTransactionFormProps>(({ workspaceId }) => {
	const [showAdditionalFields, setShowAdditionalFields] = useState(false)
	const { lastTransaction, loading } = transactionStore

	const form = useForm<CreateTransactionInput>({
		resolver: zodResolver(createTransactionSchema),
		defaultValues: {
			workspace_id: workspaceId
		}
	})

	const onSubmit = async (data: CreateTransactionInput) => {
		await transactionStore.createTransaction(data)
	}

	if (lastTransaction) {
		return <QrCodePayment transaction={lastTransaction} />
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Оплата</CardTitle>
				<CardDescription>Создание транзакции</CardDescription>
			</CardHeader>
			<CardContent>
				<Form ctx={form} onSubmit={onSubmit} className='space-y-4'>
					<FormInput
						name='amount'
						placeholder='Сумма'
						description={
							<Button
								variant='ghost'
								type='button'
								size='xs'
								onClick={() => setShowAdditionalFields(!showAdditionalFields)}
							>
								{showAdditionalFields ? 'Скрыть доп. информацию' : 'Указать доп. информацию'}
							</Button>
						}
						mask='9999999'
						disabled={loading}
						required
					/>
					{showAdditionalFields ? <AdditionalTransactionFields /> : null}
					<Button type='submit' className='w-full' disabled={!form.formState.isValid} loading={loading}>
						Создать
					</Button>
				</Form>
			</CardContent>
		</Card>
	)
})
