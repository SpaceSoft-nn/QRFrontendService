import { OrganizationCreateForm, OrganizationList } from '@/features/organization'
import { TitleUi } from '@/shared/ui'

export const OrganizationsPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<TitleUi text='Организации' />
				<OrganizationCreateForm />
			</div>
			<OrganizationList />
		</div>
	)
}
