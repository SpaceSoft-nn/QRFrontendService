import { observer } from 'mobx-react-lite'
import { membersStore } from '@/entities/members'
import { DataTable } from '@/shared/ui/data-table'
import { membersListColumns } from './members-list.columns'

export const MembersList = observer(() => {
	const { members, loading, error } = membersStore

	return (
		<DataTable
			columns={membersListColumns}
			data={members}
			loading={loading}
			error={error}
			emptyText='Пользователи не найдены'
		/>
	)
})
