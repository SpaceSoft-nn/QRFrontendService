import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useBreadcrumbs } from '@/features/breadcrumbs'
import { WorkSpaceCard, WorkSpaceMembersList } from '@/features/workspace'
import { workspaceStore } from '@/entities/workspace'
import { NotFound } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/skeleton'
import { urls } from '@/shared/config'

const WorkspaceDetailsSkeleton = () => (
	<div className='space-y-4'>
		<Skeleton className='h-[200px] w-full' />
		<Skeleton className='h-[300px] w-full' />
	</div>
)

const useWorkspaceDetails = (workspaceId: string | undefined) => {
	const { setDynamicLabel } = useBreadcrumbs()

	useEffect(() => {
		if (!workspaceId) return
		workspaceStore.getWorkspace(workspaceId)
	}, [workspaceId])

	const workspace = workspaceStore.workspaces.find(w => w.id === workspaceId)

	useEffect(() => {
		if (workspace && workspaceId) {
			setDynamicLabel(urls.dashboard.workSpaceById(workspaceId), workspace.name)
		}
	}, [workspace, workspaceId, setDynamicLabel])

	return {
		workspace,
		isLoading: workspaceStore.loading && !workspace,
		isNotFound: !workspaceId || !workspace
	}
}

export const WorkspaceDetails = observer(() => {
	const params = useParams()
	const workspaceId = params.workspaceId
	const { workspace, isLoading, isNotFound } = useWorkspaceDetails(workspaceId)

	if (isLoading) return <WorkspaceDetailsSkeleton />
	if (isNotFound || !workspace) return <NotFound title='Рабочее место не найдено' />

	return (
		<div className='space-y-4'>
			<WorkSpaceCard workspace={workspace} />
			<WorkSpaceMembersList workspaceId={workspace.id} />
		</div>
	)
})
