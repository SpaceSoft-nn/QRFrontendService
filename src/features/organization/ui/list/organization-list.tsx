import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { organizationStore } from '@/entities/organization'
import { DataTable } from '@/shared/ui'
import { organizationListColumns } from './organization-list.columns'

export const OrganizationList = observer(() => {
	const { organizations, loading, error } = organizationStore

	useEffect(() => {
		organizationStore.getOrganizations()
	}, [])

	return <DataTable columns={organizationListColumns} data={organizations} loading={loading} error={error} />
})
