import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Workspace } from '@/shared/api/graphql'
import { WorkSpaceBadgeStatus } from '../badge/WorkSpaceBadgeStatus'
import { urls } from '@/shared/config'

interface WorkSpaceCardProps {
	workspace: Workspace
}

// TODO: Продумать взаимодействие с АРМ, сделать slug, модалку для назначения сотрудника
export const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({ workspace }) => {
	return (
		<Card variant='hover' href={`${urls.dashboard.workSpaceBySlug(workspace.name)}`}>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<span>{workspace.name}</span>
					<WorkSpaceBadgeStatus status={workspace.is_active} />
				</CardTitle>
				<CardDescription>{workspace.created_at}</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-1 !pt-3 text-sm'>
				<div className='flex justify-between gap-2'>
					<span className='text-muted-foreground'>Создал</span>
					<p className='text-right'>
						{workspace.user_owner.first_name} {workspace.user_owner.last_name}
					</p>
				</div>
				<div className='flex justify-between gap-2'>
					<span className='text-muted-foreground'>Сотрудник</span>
					{workspace.user_worker ? (
						<p>
							{workspace.user_worker.first_name} {workspace.user_worker.last_name}
						</p>
					) : (
						<Link to='#'>Назначить</Link>
					)}
				</div>
				<div className='flex justify-between gap-2'>
					<span className='text-muted-foreground'>Интеграция</span>
					{workspace.paymentMethod ? (
						<p>{workspace.paymentMethod.driver_name}</p>
					) : (
						<Link to='#'>Настроить</Link>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
