import { UserRoleEnum } from '@/shared/api/graphql'

export const userRoles: Record<UserRoleEnum, string> = {
	[UserRoleEnum.Cassier]: 'Кассир',
	[UserRoleEnum.Manager]: 'Менеджер',
	[UserRoleEnum.Admin]: 'Админ'
}
