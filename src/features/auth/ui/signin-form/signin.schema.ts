import { z } from 'zod'

export const signinFormSchema = z.object({
	email: z.string().min(1, 'Введите email').email('Введите корректный email'),
	password: z.string().min(1, 'Введите пароль')
})

export type SigninFormSchema = z.infer<typeof signinFormSchema>
