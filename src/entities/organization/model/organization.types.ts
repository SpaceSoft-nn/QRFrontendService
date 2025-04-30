import { PartySuggestions } from 'react-dadata'
import { userRoles } from '@/entities/user'
import { Organization, UserRoleEnum } from '@/shared/api/graphql'

export interface OrganizationWithOpf extends Organization {
	nameWithOpf: string
}

export enum CreateOrganizationMemberRole {
	CASSIER = UserRoleEnum.Cassier,
	MANAGER = UserRoleEnum.Manager
}

export type PartySuggestionsProps = Omit<React.ComponentProps<typeof PartySuggestions>, 'token' | 'count' | 'delay'>
export type PartySuggestionsValue = PartySuggestionsProps['value']

export const createMemberRoles: Record<CreateOrganizationMemberRole, string> = {
	[CreateOrganizationMemberRole.CASSIER]: userRoles[UserRoleEnum.Cassier],
	[CreateOrganizationMemberRole.MANAGER]: userRoles[UserRoleEnum.Manager]
}

export const memberRolesOptions = Object.entries(CreateOrganizationMemberRole).map(([value, label]) => ({
	value,
	label: createMemberRoles[value as CreateOrganizationMemberRole]
}))
