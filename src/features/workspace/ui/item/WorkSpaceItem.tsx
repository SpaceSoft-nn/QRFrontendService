import { observer } from 'mobx-react-lite'
import { DataGroup, DateTimeUi } from '@/shared/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Workspace } from '@/shared/api/graphql'
import { getWorkspaceItemData } from '../../model/config'
import { WorkSpaceBadgeStatus } from '../badge/WorkSpaceBadgeStatus'
import { urls } from '@/shared/config'

export const WorkSpaceItem = observer(({ workspace }: { workspace: Workspace }) => {
	const workspaceItemData = getWorkspaceItemData(workspace)

	return (
		<Card variant='hover' href={urls.dashboard.workSpaceById(workspace.id)}>
			<CardHeader>
				<CardTitle className='flex items-center justify-between gap-2'>
					<span>{workspace.name}</span>
					<WorkSpaceBadgeStatus status={workspace.is_active} />
				</CardTitle>
				<DateTimeUi dateTime={workspace.created_at} />
			</CardHeader>
			<CardContent>
				<DataGroup data={workspaceItemData} />
			</CardContent>
		</Card>
	)
})
