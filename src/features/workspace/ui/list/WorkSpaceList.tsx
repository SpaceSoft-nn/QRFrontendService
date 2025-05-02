import { useEffect } from 'react'
import { RefreshCwIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { WorkSpaceItem } from '@/features/workspace'
import { workspaceStore } from '@/entities/workspace'
import { PaginationUi, SkeletonListUi } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

const WorkSpaceListError = ({ error }: { error: string | null }) => {
	return (
		<Card>
			<CardContent className='flex flex-col h-full items-center justify-center gap-2 !pt-0 text-muted-foreground'>
				<p className='text-destructive text-wrap'>{error}</p>
				<Button variant='outline' icon={RefreshCwIcon} onClick={() => workspaceStore.getWorkspaces()}>
					Попробовать снова
				</Button>
			</CardContent>
		</Card>
	)
}

const WorkSpaceListEmpty = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Рабочие места отсутствуют</CardTitle>
				<CardDescription>Создайте рабочее место, чтобы начать работу.</CardDescription>
			</CardHeader>
		</Card>
	)
}

export const WorkSpaceList = observer(() => {
	const { workspaces, loading, error, pagination, getWorkspaces } = workspaceStore

	useEffect(() => {
		getWorkspaces()
	}, [])

	const renderList = () => {
		if (loading) return <SkeletonListUi length={9} />
		if (error) return <WorkSpaceListError error={error} />
		if (workspaces.length === 0) return <WorkSpaceListEmpty />

		return workspaces.map(workspace => <WorkSpaceItem key={workspace.id} workspace={workspace} />)
	}

	return (
		<div className='flex flex-col h-full justify-between gap-4'>
			{pagination.total > pagination.limit && (
				<PaginationUi pagination={pagination} onChangePage={workspaceStore.changePage} />
			)}

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>{renderList()}</div>
		</div>
	)
})
