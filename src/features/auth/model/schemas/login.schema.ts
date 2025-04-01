import { z } from 'zod'
import { PHONE_REGEX } from '@/shared/constants'

const baseSchema = {
	password: z.string().min(1, 'Введите пароль')
}

export const loginSchema = z
	.discriminatedUnion('authMethod', [
		z.object({
			...baseSchema,
			authMethod: z.literal('email'),
			email: z.string().email('Введите корректный email')
		}),
		z.object({
			...baseSchema,
			authMethod: z.literal('phone'),
			phone: z.string().regex(PHONE_REGEX, 'Введите корректный телефон')
		})
	])
	.transform(data => {
		const { authMethod, ...rest } = data
		return rest
	})

export type LoginSchema = z.infer<typeof loginSchema>
