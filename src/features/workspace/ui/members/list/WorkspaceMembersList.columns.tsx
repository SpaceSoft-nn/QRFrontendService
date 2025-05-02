import { ColumnDef } from '@tanstack/react-table'
import { UserRoleBadge } from '@/features/user'
import { formatFullName } from '@/entities/user'
import { CopyableUi } from '@/shared/ui'
import { User } from '@/shared/api/graphql'
import { WorkspaceMemberActions } from '../WorkspaceMemberActions'

const memberContacts = (user: User) => {
	return (
		<div className='flex flex-col gap-2 w-fit'>
			{user.email && <CopyableUi value={user.email} />}
			{user.phone && <CopyableUi value={user.phone} />}
		</div>
	)
}

export const worksSpaceMembersColumns = (workspaceId: string, disableActions: boolean = false): ColumnDef<User>[] => [
	{
		header: 'ФИО',
		accessorKey: 'first_name',
		cell: ({ row }) => {
			return formatFullName(row.original)
		}
	},
	{
		header: 'Роль',
		accessorKey: 'role',
		cell: ({ row }) => {
			return <UserRoleBadge role={row.original.role} />
		}
	},
	{
		header: 'Email',
		accessorKey: 'email',
		cell: ({ row }) => {
			return memberContacts(row.original)
		}
	},
	...(!disableActions
		? [
				{
					id: 'actions',
					header: () => <div className='text-right'>Действия</div>,
					cell: ({ row }: { row: { original: User } }) => {
						return (
							<div className='flex justify-end'>
								<WorkspaceMemberActions member={row.original} workspaceId={workspaceId} />
							</div>
						)
					}
				}
			]
		: [])
]
