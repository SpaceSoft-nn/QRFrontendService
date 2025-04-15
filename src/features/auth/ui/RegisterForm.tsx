import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { authStore } from '@/features/auth'
import { Button } from '@/shared/ui'
import { Form, FormCheckbox, FormErrorMessage, FormInput } from '@/shared/ui/Forms'
import { registerSchema, TypeRegisterSchema } from '../model/schemas'
import { AuthMethodSelector } from './AuthMethodSelector'
import { AuthWrapper } from './AuthWrapper'
import { urls } from '@/shared/config'

export const RegisterForm: React.FC = observer(() => {
	const navigate = useNavigate()
	const { loading, error } = authStore

	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			// @ts-ignore
			authMethod: 'email'
		}
	})

	const onSubmit = async (data: TypeRegisterSchema) => {
		console.log(data)
		const success = await authStore.register(data)
		if (success) {
			navigate(urls.dashboard.main)
		}
	}

	useEffect(() => {
		console.group('RegisterForm')
		console.log('form.getValues()', form.getValues())
		console.log('form.formState.isValid', form.formState.isValid)
		console.log('form.formState.errors', form.formState.errors)
		console.groupEnd()
	}, [form.formState.isValid])

	return (
		<AuthWrapper title='Регистрация' redirectTo={urls.auth.login} redirectText='Уже есть аккаунт? Войти'>
			<Form ctx={form} onSubmit={onSubmit} className='space-y-3'>
				<AuthMethodSelector disabled={loading} />
				<FormInput name='first_name' placeholder='Имя' autoComplete='given-name' disabled={loading} />
				<FormInput name='last_name' placeholder='Фамилия' autoComplete='family-name' disabled={loading} />
				<FormInput name='father_name' placeholder='Отчество' autoComplete='middle-name' disabled={loading} />
				<FormInput
					name='password'
					type='password'
					autoComplete='new-password'
					placeholder='Пароль'
					disabled={loading}
				/>
				<FormInput
					name='password_confirmation'
					type='password'
					autoComplete='new-password'
					placeholder='Подтвердите пароль'
					disabled={loading}
				/>

				<FormCheckbox name='agreement' label='Я согласен с условиями использования' disabled={loading} />

				{error && <FormErrorMessage>{error}</FormErrorMessage>}

				<Button
					type='submit'
					className='w-full'
					loading={loading}
					disabled={!form.formState.isValid || loading}
				>
					Зарегистрироваться
				</Button>
			</Form>
		</AuthWrapper>
	)
})
