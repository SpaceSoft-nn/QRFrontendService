import { PlusIcon } from 'lucide-react'
import { WorkSpaceList } from '@/features/workspace'
import { TitleUi } from '@/shared/ui'
import { Button } from '@/shared/ui/button'

export const WorkSpacesPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<TitleUi text='АРМы' />
				<Button variant='outline' icon={PlusIcon}>
					Добавить
				</Button>
			</div>
			<WorkSpaceList />
		</div>
	)
}
