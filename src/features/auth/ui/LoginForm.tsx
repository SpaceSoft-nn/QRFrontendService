import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { authStore } from '@/features/auth'
import { Button } from '@/shared/ui'
import { Form, FormErrorMessage, FormInput } from '@/shared/ui/Forms'
import { loginSchema, TypeLoginSchema } from '../model/schemas/login.schema'
import { AuthMethodSelector } from './AuthMethodSelector'
import { AuthWrapper } from './AuthWrapper'
import { urls } from '@/shared/config'

export const LoginForm: React.FC = observer(() => {
	const navigate = useNavigate()
	const { loading, error } = authStore

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			// @ts-ignore
			authMethod: 'email'
		}
	})

	const onSubmit = async (data: TypeLoginSchema) => {
		console.log(data)
		const success = await authStore.login(data)
		if (success) {
			navigate(urls.dashboard.main)
		}
	}

	return (
		<AuthWrapper title='Вход' redirectTo={urls.auth.register} redirectText='Зарегистрироваться'>
			<Form ctx={form} onSubmit={onSubmit} className='space-y-3'>
				<AuthMethodSelector disabled={loading} />
				<FormInput
					name='password'
					type='password'
					autoComplete='new-password'
					placeholder='Пароль'
					disabled={loading}
				/>

				{error && <FormErrorMessage>{error}</FormErrorMessage>}

				<Button
					type='submit'
					className='w-full'
					loading={loading}
					disabled={!form.formState.isValid || loading}
				>
					Войти
				</Button>
			</Form>
		</AuthWrapper>
	)
})
