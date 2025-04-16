import { PlusIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { WorkSpaceCard, workspaceStore } from '@/features/workspace'
import { Card, CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

const WorkSpaceListSkeleton = () => {
	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{Array.from({ length: 3 }).map((_, index) => (
				<Skeleton key={index} className='h-40 w-full' />
			))}
		</div>
	)
}

const WorkSpaceListError = ({ error }: { error: string | null }) => {
	return (
		<div className='flex h-full items-center justify-center'>
			<p className='text-red-500'>{error}</p>
		</div>
	)
}

// TODO: Добавить кнопку для создания АРМ
const WorkSpaceListEmpty = () => {
	return (
		<Card className='border-dashed hover:bg-card/10 transition-all duration-300'>
			<CardContent className='flex h-full items-center justify-center gap-2 !pt-0 text-muted-foreground'>
				<PlusIcon className='h-5 w-5' />
				<p>Купить АРМ</p>
			</CardContent>
		</Card>
	)
}

export const WorkSpaceList = observer(() => {
	const { workspaces, loading, error } = workspaceStore

	if (loading) return <WorkSpaceListSkeleton />
	if (error) return <WorkSpaceListError error={error} />
	if (workspaces.length === 0) return <WorkSpaceListEmpty />

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
			{workspaces.map(workspace => (
				<WorkSpaceCard key={workspace.id} workspace={workspace} />
			))}
		</div>
	)
})
