import { userRoles } from '@/entities/user'
import { Organization, UserRoleEnum } from '@/shared/api/graphql'

export interface OrganizationWithOpf extends Organization {
	nameWithOpf: string
}

export enum CreateOrganizationMemberRole {
	cassier = UserRoleEnum.Cassier,
	manager = UserRoleEnum.Manager
}

export const createMemberRoles: Record<CreateOrganizationMemberRole, string> = {
	[CreateOrganizationMemberRole.cassier]: userRoles[UserRoleEnum.Cassier],
	[CreateOrganizationMemberRole.manager]: userRoles[UserRoleEnum.Manager]
}

export const memberRolesOptions = Object.entries(CreateOrganizationMemberRole).map(([value, label]) => ({
	value,
	label: createMemberRoles[value as CreateOrganizationMemberRole]
}))
