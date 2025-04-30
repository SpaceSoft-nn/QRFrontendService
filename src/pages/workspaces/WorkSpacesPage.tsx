import { CreateWorkspaceForm, WorkSpaceList } from '@/features/workspace'
import { TitleUi } from '@/shared/ui'

export const WorkSpacesPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<TitleUi text='Рабочие места' />
				<CreateWorkspaceForm />
			</div>
			<WorkSpaceList />
		</div>
	)
}
