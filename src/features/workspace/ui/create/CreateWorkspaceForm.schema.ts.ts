import { z } from 'zod'

export const createWorkspaceSchema = z.object({
	name: z.string({ required_error: 'Укажите название' }).min(2, { message: 'Укажите корректное название' }),
	description: z.string().optional(),
	organization_id: z.string({ required_error: 'Выберите организацию' }),
	payment_method_id: z.string({ required_error: 'Выберите метод оплаты' })
})
