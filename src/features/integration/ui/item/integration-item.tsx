import { DataGroup, DateTimeUi, SecretField } from '@/shared/ui'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { DriverInfo } from '@/shared/api/graphql'
import { getIntegrationItemData } from '../../model/config'

interface IntegrationItemProps {
	integration: DriverInfo
}

export const IntegrationItem = ({ integration }: IntegrationItemProps) => {
	const integrationItemData = getIntegrationItemData(integration)

	return (
		<Card>
			<CardHeader>
				<CardTitle>{integration.key}</CardTitle>
				<DateTimeUi dateTime={integration.created_at} />
			</CardHeader>
			<CardContent>
				<DataGroup data={integrationItemData} />
			</CardContent>
			<CardFooter>
				<SecretField value={integration.value} />
			</CardFooter>
		</Card>
	)
}
