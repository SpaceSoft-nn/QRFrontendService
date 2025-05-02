import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useBreadcrumbs } from '@/features/breadcrumbs'
import { CreateTransactionForm } from '@/features/transaction'
import { WorkSpaceCard, WorkSpaceMembersList } from '@/features/workspace'
import { workspaceStore } from '@/entities/workspace'
import { NotFound, Skeleton, TitleUi } from '@/shared/ui'
import { urls } from '@/shared/config'

interface WorkspaceDetailsProps {
	id: string | undefined
}

const WorkspaceDetailsSkeleton = () => (
	<div className='space-y-4'>
		<Skeleton className='h-[200px] w-full' />
		<Skeleton className='h-[300px] w-full' />
	</div>
)

const useWorkspaceDetails = (workspaceId: string | undefined) => {
	const { workspaces, getWorkspace, loading } = workspaceStore
	const { setDynamicLabel } = useBreadcrumbs()

	useEffect(() => {
		if (!workspaceId) return
		getWorkspace(workspaceId)
	}, [workspaceId])

	const workspace = workspaces.find(workspace => workspace.id === workspaceId)

	useEffect(() => {
		if (workspace && workspaceId) {
			setDynamicLabel(urls.dashboard.workSpaceById(workspaceId), workspace.name)
		}
	}, [workspace, workspaceId, setDynamicLabel])

	return {
		workspace,
		isLoading: loading && !workspace,
		isNotFound: !workspaceId || !workspace
	}
}

export const WorkspaceDetails = observer<WorkspaceDetailsProps>(({ id }) => {
	const { workspace, isLoading, isNotFound } = useWorkspaceDetails(id)

	if (isLoading) return <WorkspaceDetailsSkeleton />
	if (isNotFound || !workspace) return <NotFound title='Рабочее место не найдено' />

	return (
		<div className='space-y-4'>
			<TitleUi text='Информация' />
			<div className='flex md:flex-row flex-col gap-4'>
				<WorkSpaceCard workspace={workspace} />
				<CreateTransactionForm workspaceId={workspace.id} />
			</div>
			<WorkSpaceMembersList workspaceId={workspace.id} />
		</div>
	)
})
