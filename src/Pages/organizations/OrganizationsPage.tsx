import { Plus } from 'lucide-react'
import { OrganizationList } from '@/features/organization'
import { Button, TitleUi } from '@/shared/ui'

export const OrganizationsPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<TitleUi text='Организации' />
				<Button variant='outline' icon={Plus}>
					Добавить
				</Button>
			</div>
			<OrganizationList />
		</div>
	)
}
