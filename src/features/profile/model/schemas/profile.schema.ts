import { z } from 'zod'
import { PHONE_REGEX } from '@/shared/constants'

export const profileSchema = z
	.object({
		first_name: z.string().min(1, 'Имя должно быть не менее 1 символа'),
		last_name: z.string().min(1, 'Фамилия должна быть не менее 1 символа'),
		father_name: z.string().min(1, 'Отчество должно быть не менее 1 символа'),
		email: z.string().email('Введите корректный email').optional(),
		phone: z.string().regex(PHONE_REGEX, 'Введите корректный телефон').optional(),
		password: z.string().min(8, 'Пароль должен быть не менее 8 символов').optional(),
		password_confirmation: z.string().min(8, 'Пароль должен быть не менее 8 символов').optional()
	})
	.refine(
		data => {
			// Если указан пароль, то должно быть указано и подтверждение
			if (data.password && !data.password_confirmation) {
				return false
			}
			// Если указано подтверждение, то должен быть указан пароль
			if (data.password_confirmation && !data.password) {
				return false
			}
			// Если указаны оба, они должны совпадать
			if (data.password && data.password_confirmation && data.password !== data.password_confirmation) {
				return false
			}
			return true
		},
		{
			message: 'Пароли не совпадают',
			path: ['password_confirmation']
		}
	)

export type TypeProfileSchema = z.infer<typeof profileSchema>
