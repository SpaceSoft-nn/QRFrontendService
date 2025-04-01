import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui'
import { FormErrorMessage, FormInput } from '@/shared/ui/Forms'
import { LoginSchema, loginSchema } from '../model/schemas/login.schema'
import { authStore } from '../model/store/auth.store'
import { AuthMethodSelector } from './AuthMethodSelector'
import { urls } from '@/shared/config'

export const SignInForm = () => {
	const navigate = useNavigate()

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = async (data: LoginSchema) => {
		console.log(data)
		const success = await authStore.login(data)
		if (success) {
			navigate(urls.dashboard.main)
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<AuthMethodSelector />
				<FormInput name='password' type='password' autoComplete='new-password' placeholder='Пароль' />
				{authStore.error && <FormErrorMessage>{authStore.error}</FormErrorMessage>}
				<Button type='submit' className='w-full' loading={authStore.loading} disabled={!form.formState.isValid}>
					Войти
				</Button>
				<Link to={urls.auth.register} className='block w-full'>
					<Button variant='secondary' className='w-full' type='button'>
						Зарегистрироваться
					</Button>
				</Link>
			</form>
		</FormProvider>
	)
}
