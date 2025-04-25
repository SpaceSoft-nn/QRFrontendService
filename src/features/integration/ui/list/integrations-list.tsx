import { useEffect } from 'react'
import { RefreshCwIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { integrationStore } from '@/entities/integration'
import { Button, Card, CardContent, CardHeader, CardTitle, SkeletonListUi } from '@/shared/ui'
import { IntegrationItem } from '../item/integration-item'

const IntegrationsListError = ({ error }: { error: string | null }) => {
	return (
		<Card>
			<CardContent className='flex flex-col h-full items-center justify-center gap-2 !pt-0 text-muted-foreground'>
				<p className='text-destructive text-wrap'>{error}</p>
				<Button variant='outline' icon={RefreshCwIcon} onClick={() => integrationStore.getIntegrations()}>
					Попробовать снова
				</Button>
			</CardContent>
		</Card>
	)
}

const IntegrationsListEmpty = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Интеграции отсутствуют</CardTitle>
			</CardHeader>
		</Card>
	)
}

export const IntegrationsList = observer(() => {
	const { intergations, loading, error } = integrationStore

	useEffect(() => {
		integrationStore.getIntegrations()
	}, [])

	const renderList = () => {
		if (loading) return <SkeletonListUi length={6} />
		if (error) return <IntegrationsListError error={error} />
		if (intergations.length === 0) return <IntegrationsListEmpty />
		return intergations.map(integration => <IntegrationItem key={integration.id} integration={integration} />)
	}

	return <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>{renderList()}</div>
})
