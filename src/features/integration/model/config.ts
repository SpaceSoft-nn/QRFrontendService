import { Building2Icon, CreditCardIcon, ShieldUserIcon } from 'lucide-react'
import { formatOrganizationWithOpf } from '@/entities/organization'
import { formatFullName } from '@/entities/user'
import { DriverInfo } from '@/shared/api/graphql'

export const getIntegrationItemData = (integration: DriverInfo) => [
	{
		icon: Building2Icon,
		label: 'Организация',
		data: formatOrganizationWithOpf(integration.organization).nameWithOpf
	},
	{
		icon: ShieldUserIcon,
		label: 'Создал',
		data: formatFullName(integration.user, { initials: true })
	},
	{
		icon: CreditCardIcon,
		label: 'Метод оплаты',
		data: integration.payment_method.driver_name
	}
]
