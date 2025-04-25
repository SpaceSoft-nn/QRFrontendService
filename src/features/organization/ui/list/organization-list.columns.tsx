import { ColumnDef } from '@tanstack/react-table'
import { OrganizationWithOpf } from '@/entities/organization'
import { CopyableUi } from '@/shared/ui'

const OrganizationNameWithAddress = ({ organization }: { organization: OrganizationWithOpf }) => {
	return (
		<div className='flex flex-col gap-1'>
			<span>{organization.nameWithOpf}</span>
			<span className='hidden md:block text-xs text-muted-foreground'>{organization.address}</span>
		</div>
	)
}

export const organizationListColumns: ColumnDef<OrganizationWithOpf>[] = [
	{
		header: 'Название',
		accessorKey: 'nameWithOpf',
		cell: ({ row }) => <OrganizationNameWithAddress organization={row.original} />
	},
	{
		header: 'ИНН/КПП',
		accessorKey: 'inn',
		cell: ({ row }) => {
			return (
				<div className='flex flex-col'>
					<CopyableUi value={row.original.inn} />
					{row.original.kpp && <CopyableUi value={row.original.kpp} />}
				</div>
			)
		}
	},
	{
		header: 'ОГРН/ОГРНИП',
		accessorKey: 'registration_number',
		cell: ({ row }) => {
			return row.original.registration_number ? <CopyableUi value={row.original.registration_number} /> : '-'
		}
	}
]
