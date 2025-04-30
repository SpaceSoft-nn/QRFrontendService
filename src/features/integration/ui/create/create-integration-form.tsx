import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { integrationStore } from '@/entities/integration'
import { PaymentMethodFormSelector } from '@/entities/payment-method'
import { userStore } from '@/entities/user'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui'
import { Form, FormInput } from '@/shared/ui/Forms'
import { DriverInfoInput, UserRoleEnum } from '@/shared/api/graphql'
import { createIntegrationSchema, CreateIntegrationSchemaType } from './create-integration.schema'

export const CreateIntegrationForm = observer(() => {
	const { createIntergration, loading } = integrationStore
	const { user } = userStore
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<CreateIntegrationSchemaType>({
		resolver: zodResolver(createIntegrationSchema)
	})

	const handleSubmit = async (data: CreateIntegrationSchemaType) => {
		await createIntergration(data as DriverInfoInput)
		form.reset()
		setIsOpen(false)
	}

	if (user?.role === UserRoleEnum.Cassier) return null

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button icon={Plus}>Добавить</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Добавление интеграции</DialogTitle>
					<DialogDescription>Выберите метод оплаты и введите ключ</DialogDescription>
				</DialogHeader>
				<Form ctx={form} onSubmit={handleSubmit} className='space-y-4'>
					<FormInput name='key' placeholder='Название интеграции' />
					<FormInput type='password' name='value' placeholder='API-ключ интеграции' />
					<PaymentMethodFormSelector name='payment_method_id' />
					<Button type='submit' className='w-full' disabled={!form.formState.isValid} loading={loading}>
						Создать
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	)
})
