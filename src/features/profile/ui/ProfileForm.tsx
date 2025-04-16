import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { userStore } from '@/features/user'
import { Button } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Form, FormErrorMessage, FormInput } from '@/shared/ui/Forms'
import { profileSchema, TypeProfileSchema } from '../model/schemas/profile.schema'
import { profileStore } from '../model/store/profile.store'

export const ProfileForm: React.FC = observer(() => {
	const { user, loading: userLoading } = userStore
	const { loading, error } = profileStore

	const form = useForm<TypeProfileSchema>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			first_name: user?.first_name || '',
			last_name: user?.last_name || '',
			father_name: user?.father_name || '',
			email: user?.email || '',
			phone: user?.phone || ''
		}
	})

	useEffect(() => {
		if (user) {
			form.reset({
				first_name: user.first_name || '',
				last_name: user.last_name || '',
				father_name: user.father_name || '',
				email: user.email || '',
				phone: user.phone || ''
			})
		}
	}, [user, form])

	const onSubmit = (data: TypeProfileSchema) => {
		console.log(data)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Ваши данные</CardTitle>
				<CardDescription>Управление личными данными</CardDescription>
			</CardHeader>
			<CardContent>
				<Form ctx={form} onSubmit={onSubmit} className='space-y-4'>
					<FormInput name='first_name' placeholder='Имя' disabled={loading || userLoading} />
					<FormInput name='last_name' placeholder='Фамилия' disabled={loading || userLoading} />
					<FormInput name='father_name' placeholder='Отчество' disabled={loading || userLoading} />
					<FormInput name='email' placeholder='Email' disabled={loading || userLoading} />
					<FormInput name='phone' placeholder='Телефон' disabled={loading || userLoading} />
					<FormInput
						name='password'
						type='password'
						placeholder='Новый пароль (оставьте пустым, чтобы не менять)'
						disabled={loading || userLoading}
					/>
					<FormInput
						name='password_confirmation'
						type='password'
						placeholder='Подтверждение нового пароля'
						disabled={loading || userLoading}
					/>

					{error && <FormErrorMessage>{error}</FormErrorMessage>}

					<Button
						type='submit'
						className='w-full'
						loading={loading || userLoading}
						disabled={loading || userLoading}
					>
						Сохранить изменения
					</Button>
				</Form>
			</CardContent>
		</Card>
	)
})
