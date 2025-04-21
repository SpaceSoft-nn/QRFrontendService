import { userRoles } from '@/entities/user'
import { UserRoleEnum } from '@/shared/api/graphql'

export enum CreateMemberRole {
	cassier = UserRoleEnum.Cassier,
	manager = UserRoleEnum.Manager
}

export const createMemberRoles: Record<CreateMemberRole, string> = {
	[CreateMemberRole.cassier]: userRoles[UserRoleEnum.Cassier],
	[CreateMemberRole.manager]: userRoles[UserRoleEnum.Manager]
}

export const memberRolesOptions = Object.entries(CreateMemberRole).map(([value, label]) => ({
	value,
	label: createMemberRoles[value as CreateMemberRole]
}))
