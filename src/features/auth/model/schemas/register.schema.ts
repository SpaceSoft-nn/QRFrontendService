import { z } from 'zod'
import { PHONE_REGEX } from '@/shared/constants'

const baseRegisterSchema = {
	password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
	password_confirmation: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
	first_name: z.string().min(1, 'Имя должно быть не менее 1 символа'),
	last_name: z.string().min(1, 'Фамилия должна быть не менее 1 символа'),
	father_name: z.string().min(1, 'Отчество должно быть не менее 1 символа')
}

export const registerSchema = z
	.discriminatedUnion('authMethod', [
		z.object({
			email: z.string().email('Введите корректный email'),
			authMethod: z.literal('email'),
			...baseRegisterSchema
		}),
		z.object({
			phone: z.string().regex(PHONE_REGEX, 'Введите корректный телефон'),
			authMethod: z.literal('phone'),
			...baseRegisterSchema
		})
	])
	.refine(data => data.password === data.password_confirmation, {
		message: 'Пароли не совпадают',
		path: ['password_confirmation']
	})
	.transform(data => {
		const { authMethod, ...rest } = data
		return rest
	})

export type TypeRegisterSchema = z.infer<typeof registerSchema>
