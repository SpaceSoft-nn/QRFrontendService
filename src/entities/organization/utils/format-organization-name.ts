import { Organization } from '@/shared/api/graphql'
import { OrganizationTypeEnum } from '@/shared/api/graphql'
import { OrganizationWithOpf } from '../model/types'

export const getOrganizationType = (type: OrganizationTypeEnum): string => {
	switch (type) {
		case OrganizationTypeEnum.Legal:
			return 'ООО'
		case OrganizationTypeEnum.Individual:
			return 'ИП'
		default:
			return type
	}
}

export const formatOrganizationWithOpf = (org: Organization): OrganizationWithOpf => {
	return {
		...org,
		nameWithOpf: `${getOrganizationType(org.type)} «${org.name}»`
	}
}
