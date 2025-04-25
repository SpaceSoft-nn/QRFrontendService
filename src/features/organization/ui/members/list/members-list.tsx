import { observer } from 'mobx-react-lite'
import { organizationStore } from '@/entities/organization'
import { DataTable } from '@/shared/ui/data-table'
import { membersListColumns } from './members-list.columns'

export const OrganizationMembersList = observer(() => {
	const { organizationMembers, loading, error } = organizationStore

	return (
		<DataTable
			columns={membersListColumns}
			data={organizationMembers}
			loading={loading}
			error={error}
			emptyText='Пользователи не найдены'
		/>
	)
})
