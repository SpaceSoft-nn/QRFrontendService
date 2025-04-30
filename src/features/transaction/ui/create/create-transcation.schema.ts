import { z } from 'zod'

export const createTransactionSchema = z.object({
	amount: z.string({ required_error: 'Укажите сумму' }).min(1, { message: 'Укажите сумму для оплаты' }),
	type_product: z.string().optional(),
	count_product: z.number().optional(),
	name_product: z.string().optional(),
	workspace_id: z.string({ required_error: 'Выберите рабочее место для оплаты' })
})

export type TypeCreateTransactionSchema = z.infer<typeof createTransactionSchema>
