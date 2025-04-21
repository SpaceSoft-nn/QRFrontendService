import { ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { OrganizationWithOpf } from '@/entities/organization'
import { CopyableUi } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'

const OrganizationNameWithAddress = ({ organization }: { organization: OrganizationWithOpf }) => {
	return (
		<div className='flex flex-col gap-1'>
			<span>{organization.nameWithOpf}</span>
			<span className='hidden md:block text-xs text-muted-foreground'>{organization.address}</span>
		</div>
	)
}

const OrganizationActions = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' icon={MoreHorizontal} />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem>
					<Pencil className='size-4' />
					Редактировать
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<ExternalLink className='size-4' />
					Подробнее
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const organizationListColumns: ColumnDef<OrganizationWithOpf>[] = [
	{
		header: 'Название',
		accessorKey: 'nameWithOpf',
		cell: ({ row }) => <OrganizationNameWithAddress organization={row.original} />
	},
	{
		header: 'ИНН',
		accessorKey: 'inn',
		cell: ({ row }) => {
			return <CopyableUi value={row.original.inn} />
		}
	},
	{
		header: 'КПП',
		accessorKey: 'kpp',
		cell: ({ row }) => {
			return row.original.kpp ? <CopyableUi value={row.original.kpp} /> : '-'
		}
	},
	{
		header: 'ОГРН/ОГРНИП',
		accessorKey: 'registration_number',
		cell: ({ row }) => {
			return row.original.registration_number ? <CopyableUi value={row.original.registration_number} /> : '-'
		}
	},
	{
		id: 'actions',
		header: () => <div className='text-right'>Действия</div>,
		cell: () => {
			return (
				<div className='flex justify-end'>
					<OrganizationActions />
				</div>
			)
		}
	}
]
