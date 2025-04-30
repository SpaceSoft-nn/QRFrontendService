import { CreateIntegrationForm, IntegrationsList } from '@/features/integration'
import { TitleUi } from '@/shared/ui'

export const IntegrationsPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<TitleUi text='Интеграции' />
				<CreateIntegrationForm />
			</div>
			<IntegrationsList />
		</div>
	)
}
