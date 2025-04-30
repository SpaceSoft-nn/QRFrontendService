import { z } from 'zod'
import { PHONE_REGEX } from '@/shared/config'

export const authMethodSchema = z.discriminatedUnion('authMethod', [
	z.object({
		authMethod: z.literal('email').default('email'),
		email: z.string().email('Введите корректный email')
	}),
	z.object({
		authMethod: z.literal('phone').default('phone'),
		phone: z.string().regex(PHONE_REGEX, 'Введите корректный телефон')
	})
])

export type AuthMethodSchema = z.infer<typeof authMethodSchema>
export type AuthMethod = 'email' | 'phone'
