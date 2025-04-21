import { OrganizationCreateInput, OrganizationTypeEnum } from '@/shared/api/graphql'
import { formatDateFromTimestamp } from '@/shared/lib'
import { PartySuggestionsValue } from '../..'

export const formatDaDataOrganization = (value: NonNullable<PartySuggestionsValue>): OrganizationCreateInput => {
	const organization: OrganizationCreateInput = {
		address: value.data.address.value,
		inn: value.data.inn,
		name: value.data.name.full,
		registration_number: value.data.ogrn,
		okved: value.data.okved,
		type: value.data.type.toLowerCase() as OrganizationTypeEnum,
		kpp: value.data.kpp,
		founded_date: formatDateFromTimestamp(value.data.state.registration_date)
	}
	return organization
}
