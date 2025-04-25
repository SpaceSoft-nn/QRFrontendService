import { z } from 'zod'
import { UserRoleEnum } from '@/shared/api/graphql'
import { PHONE_REGEX } from '@/shared/config'

const baseCreateMemberSchema = {
	password: z.string({ required_error: 'Пароль обязательное поле' }).min(8, 'Пароль должен быть не менее 8 символов'),
	password_confirmation: z
		.string({ required_error: 'Повторите пароль' })
		.min(8, 'Пароль должен быть не менее 8 символов'),
	first_name: z.string({ required_error: 'Имя обязательное поле' }).min(1, 'Имя должно быть не менее 1 символа'),
	last_name: z
		.string({ required_error: 'Фамилия обязательное поле' })
		.min(1, 'Фамилия должна быть не менее 1 символа'),
	father_name: z
		.string({ required_error: 'Отчество обязательное поле' })
		.min(1, 'Отчество должно быть не менее 1 символа'),
	role: z.nativeEnum(UserRoleEnum, { required_error: 'Выберите роль' })
}

export const createOrganizationMemberSchema = z
	.discriminatedUnion('authMethod', [
		z.object({
			email: z.string().email('Введите корректный email'),
			authMethod: z.literal('email'),
			...baseCreateMemberSchema
		}),
		z.object({
			phone: z.string().regex(PHONE_REGEX, 'Введите корректный телефон'),
			authMethod: z.literal('phone'),
			...baseCreateMemberSchema
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

export type TypeCreateOrganizationMemberSchema = z.infer<typeof createOrganizationMemberSchema>
