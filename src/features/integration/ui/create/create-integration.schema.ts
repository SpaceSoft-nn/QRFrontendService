import { z } from 'zod'

export const createIntegrationSchema = z.object({
	key: z.string().min(1, { message: 'Укажите название интеграции' }),
	value: z.string().min(1, { message: 'Укажите ключ интеграции' }),
	payment_method_id: z.string().min(1, { message: 'Выберите метод оплаты' })
})

export type CreateIntegrationSchemaType = z.infer<typeof createIntegrationSchema>
