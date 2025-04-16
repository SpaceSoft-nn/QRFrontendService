import { Link } from 'react-router-dom'
import { ExternalLinkIcon, SettingsIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Workspace } from '@/shared/api/graphql'
import { WorkSpaceBadgeStatus } from '../badge/WorkSpaceBadgeStatus'

interface WorkSpaceCardProps {
	workspace: Workspace
}

// TODO: Продумать взаимодействие с АРМ, сделать slug, модалку для назначения сотрудника
export const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({ workspace }) => {
	return (
		<Card className='hover:bg-card/10 transition-all cursor-pointer duration-300'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<span>{workspace.name}</span>
					<WorkSpaceBadgeStatus status={workspace.is_active} />
				</CardTitle>
				<CardDescription>{workspace.description}</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-2 text-sm'>
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
					{workspace.payment ? <p>{workspace.payment.name}</p> : <Link to='#'>Настроить</Link>}
				</div>
			</CardContent>
			<CardFooter className='flex gap-2'>
				<Button variant='destructive' icon={TrashIcon} size='icon' tooltip='Удалить' />
				<Button variant='outline' icon={SettingsIcon} size='icon' tooltip='Настройки' />
				<Button variant='outline' icon={ExternalLinkIcon} size='icon' tooltip='Подробнее' />
			</CardFooter>
		</Card>
	)
}
