import { useEffect } from 'react'
import { RefreshCwIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { NeedToChooseOrganization } from '@/features/organization'
import { WorkSpaceCard } from '@/features/workspace'
import { organizationStore } from '@/entities/organization'
import { workspaceStore } from '@/entities/workspace'
import { PaginationUi } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

const WorkSpaceListSkeleton = () => {
	return Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className='h-56 w-full' />)
}

const WorkSpaceListError = ({ error }: { error: string | null }) => {
	return (
		<Card variant='dashed-hover'>
			<CardContent className='flex flex-col h-full items-center justify-center gap-2 !pt-0 text-muted-foreground'>
				<p className='text-destructive text-wrap'>{error}</p>
				<Button variant='outline' icon={RefreshCwIcon} onClick={() => workspaceStore.getWorkspaces()}>
					Попробовать снова
				</Button>
			</CardContent>
		</Card>
	)
}

// TODO: Добавить кнопку для создания АРМ
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
	const { workspaces, loading, error, pagination } = workspaceStore
	const { activeOrganization, loading: organizationLoading } = organizationStore

	useEffect(() => {
		workspaceStore.getWorkspaces()
	}, [activeOrganization])

	const renderList = () => {
		if (loading || organizationLoading) return <WorkSpaceListSkeleton />
		if (error) return <WorkSpaceListError error={error} />
		if (!activeOrganization) return <NeedToChooseOrganization />
		if (workspaces.length === 0) return <WorkSpaceListEmpty />

		return workspaces.map(workspace => <WorkSpaceCard key={workspace.id} workspace={workspace} />)
	}

	return (
		<div className='flex flex-col h-full justify-between gap-4'>
			{pagination.total > pagination.limit && (
				<PaginationUi pagination={pagination} onChangePage={workspaceStore.changePage} />
			)}

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>{renderList()}</div>
		</div>
	)
})
