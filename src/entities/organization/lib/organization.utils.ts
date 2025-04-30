import { Organization, OrganizationCreateInput } from '@/shared/api/graphql'
import { OrganizationTypeEnum } from '@/shared/api/graphql'
import { formatDateFromTimestamp } from '@/shared/lib'
import { OrganizationWithOpf, PartySuggestionsValue } from '../model/organization.types'

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

export const formatDaDataOrganization = (value: NonNullable<PartySuggestionsValue>): OrganizationCreateInput => {
	const organization: OrganizationCreateInput = {
		address: value.data.address.value,
		inn: value.data.inn,
		name: value.data.name.full,
		registration_number: value.data.ogrn,
		okved: value.data.okved,
		type: value.data.type as OrganizationTypeEnum,
		kpp: value.data.kpp,
		founded_date: formatDateFromTimestamp(value.data.state.registration_date)
	}
	return organization
}
