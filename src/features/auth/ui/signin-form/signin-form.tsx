import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/features/auth'
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/shared/ui'
import { SigninFormSchema, signinFormSchema } from './signin.schema'
import { urls } from '@/shared/config'
import { useToast } from '@/shared/lib'

export const SignInForm: React.FC = () => {
	const navigate = useNavigate()
	const { toast } = useToast()
	const { login, loading } = useAuth()

	const form = useForm<SigninFormSchema>({
		resolver: zodResolver(signinFormSchema)
	})

	const onSubmit = async (data: SigninFormSchema) => {
		await login(data)
			.then(() => {
				navigate(urls.dashboard.main)
				toast({
					description: 'Вы успешно авторизовались',
					variant: 'default'
				})
			})
			.catch(error => {
				console.error(error)
				toast({
					description: 'Неверный email или пароль'
				})
			})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='example@mail.com' type='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Пароль' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full' loading={loading} disabled={!form.formState.isValid}>
					Войти
				</Button>
				<Button variant='secondary' asChild className='w-full'>
					<Link to={urls.auth.register}>Зарегистрироваться</Link>
				</Button>
			</form>
		</Form>
	)
}
