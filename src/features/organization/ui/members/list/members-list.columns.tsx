import { ColumnDef } from '@tanstack/react-table'
import { UserRoleBadge } from '@/features/user'
import { CopyableUi } from '@/shared/ui'
import { User } from '@/shared/api/graphql'

const memberContacts = (user: User) => {
	return (
		<div className='flex flex-col gap-2 w-fit'>
			{user.email && <CopyableUi value={user.email} />}
			{user.phone && <CopyableUi value={user.phone} />}
		</div>
	)
}

export const membersListColumns: ColumnDef<User>[] = [
	{
		header: 'Роль',
		accessorKey: 'role',
		cell: ({ row }) => {
			return <UserRoleBadge role={row.original.role} />
		}
	},
	{
		header: 'ФИО',
		accessorKey: 'first_name',
		cell: ({ row }) => {
			const fullName = `${row.original.first_name} ${row.original.last_name} ${row.original.father_name}`
			return <div>{fullName}</div>
		}
	},
	{
		header: 'Контакты',
		accessorKey: 'email',
		cell: ({ row }) => {
			return memberContacts(row.original)
		}
	}
]
