import { Building2, CreditCard, User } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { formatOrganizationWithOpf } from '@/entities/organization'
import { formatFullName } from '@/entities/user'
import { DataGroup } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Workspace } from '@/shared/api/graphql'
import { WorkSpaceBadgeStatus } from '../badge/WorkSpaceBadgeStatus'
import { urls } from '@/shared/config'

export const WorkSpaceItem = observer(({ workspace }: { workspace: Workspace }) => {
	const workspaceData = [
		{
			label: 'Организация',
			data: formatOrganizationWithOpf(workspace.organization).nameWithOpf,
			icon: Building2
		},
		{
			label: 'Занимает',
			data: workspace.user_worker ? formatFullName(workspace.user_worker) : 'Никто',
			icon: User
		},
		{
			label: 'Метод платы',
			data: workspace.paymentMethod ? `${workspace.paymentMethod.driver_name}` : '-',
			icon: CreditCard
		}
	]

	return (
		<Card variant='hover' href={urls.dashboard.workSpaceById(workspace.id)}>
			<CardHeader>
				<CardTitle className='flex items-center justify-between gap-2'>
					<span>{workspace.name}</span>
					<WorkSpaceBadgeStatus status={workspace.is_active} />
				</CardTitle>
				<CardDescription className='text-xs'>от {workspace.created_at}</CardDescription>
			</CardHeader>
			<CardContent>
				<DataGroup data={workspaceData} />
			</CardContent>
		</Card>
	)
})
