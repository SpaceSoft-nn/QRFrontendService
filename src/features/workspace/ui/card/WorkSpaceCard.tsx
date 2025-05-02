import { observer } from 'mobx-react-lite'
import { DataGroup, DateTimeUi } from '@/shared/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Workspace } from '@/shared/api/graphql'
import { getWorkspaceCardData } from '../../model/config'
import { WorkSpaceBadgeStatus } from '../badge/WorkSpaceBadgeStatus'

interface WorkspaceCardProps {
	workspace: Workspace
}

export const WorkSpaceCard = observer<WorkspaceCardProps>(({ workspace }) => {
	const workspaceCardData = getWorkspaceCardData(workspace)

	return (
		<Card className='flex-1'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between gap-2'>
					<span>{workspace.name}</span>
					<WorkSpaceBadgeStatus status={workspace.is_active} />
				</CardTitle>
				<DateTimeUi dateTime={workspace.created_at} />
			</CardHeader>
			<CardContent>
				<DataGroup data={workspaceCardData} />
			</CardContent>
		</Card>
	)
})
