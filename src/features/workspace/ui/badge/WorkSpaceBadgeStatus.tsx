import { Badge } from '@/shared/ui/badge'
import { Workspace } from '@/shared/api/graphql'

export const WorkSpaceBadgeStatus = ({ status }: { status: Workspace['is_active'] }) => {
	const getBadgeStatusColor = () => {
		switch (status) {
			case true:
				return 'text-green-500'
			case false:
				return 'text-red-500'
		}
	}

	return (
		<Badge variant='outline' className={getBadgeStatusColor()}>
			{status ? 'Активно' : 'Неактивно'}
		</Badge>
	)
}
