import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui'
import { Form, FormErrorMessage, FormInput } from '@/shared/ui/Forms'
import { loginSchema, TypeLoginSchema } from '../model/schemas/login.schema'
import { authStore } from '../model/store/auth.store'
import { AuthMethodSelector } from './AuthMethodSelector'
import { urls } from '@/shared/config'

export const SignInForm: React.FC = observer(() => {
	const navigate = useNavigate()

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
		<Form ctx={form} onSubmit={onSubmit} className='space-y-3'>
			<AuthMethodSelector disabled={authStore.loading} />
			<FormInput
				name='password'
				type='password'
				autoComplete='new-password'
				placeholder='Пароль'
				disabled={authStore.loading}
			/>

			{authStore.error && <FormErrorMessage>{authStore.error}</FormErrorMessage>}

			<Button
				type='submit'
				className='w-full'
				loading={authStore.loading}
				disabled={!form.formState.isValid || authStore.loading}
			>
				Войти
			</Button>
		</Form>
	)
})
