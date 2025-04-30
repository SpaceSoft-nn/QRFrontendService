import { Building2, CreditCard, ShieldUserIcon } from 'lucide-react'
import { formatOrganizationWithOpf } from '@/entities/organization'
import { formatFullName } from '@/entities/user'
import { DataGroup, SecretField } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { DriverInfo } from '@/shared/api/graphql'
import { formatDateTime } from '@/shared/lib'

interface IntegrationItemProps {
	integration: DriverInfo
}

export const IntegrationItem = ({ integration }: IntegrationItemProps) => {
	const integrationData = [
		{
			icon: Building2,
			label: 'Организация',
			data: formatOrganizationWithOpf(integration.organization).nameWithOpf
		},
		{
			icon: ShieldUserIcon,
			label: 'Создал',
			data: formatFullName(integration.user, { initials: true })
		},
		{
			icon: CreditCard,
			label: 'Метод оплаты',
			data: integration.payment_method.driver_name
		}
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>{integration.key}</CardTitle>
				<CardDescription>от {formatDateTime(integration.created_at)}</CardDescription>
			</CardHeader>
			<CardContent>
				<DataGroup data={integrationData} />
			</CardContent>
			<CardFooter>
				<SecretField value={integration.value} />
			</CardFooter>
		</Card>
	)
}
