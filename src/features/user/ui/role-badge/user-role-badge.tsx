import { userRoles } from '@/entities/user'
import { Badge } from '@/shared/ui/badge'
import { UserRoleEnum } from '@/shared/api/graphql'

interface UserRoleBadgeProps {
	role: UserRoleEnum
}

const roleBadgeColors: Record<UserRoleEnum, string> = {
	[UserRoleEnum.Cassier]: 'bg-blue-500',
	[UserRoleEnum.Manager]: 'bg-green-500',
	[UserRoleEnum.Admin]: 'bg-red-500'
}

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
	return (
		<Badge variant='outline' className={roleBadgeColors[role]}>
			{userRoles[role]}
		</Badge>
	)
}
