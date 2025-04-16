import { useState } from 'react'
import { Check, Copy, CopyCheck, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { OrganizationWithOpf } from '@/features/organization'
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

const OrganizationActions = ({ organization }: { organization: OrganizationWithOpf }) => {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopyInn = () => {
		navigator.clipboard.writeText(organization.inn)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

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
				<DropdownMenuItem className='cursor-pointer' onClick={handleCopyInn}>
					{isCopied ? <Check className='size-4' /> : <Copy className='size-4' />}
					{isCopied ? 'ИНН скопирован' : 'Скопировать ИНН'}
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
		cell: ({ row }) => <span>{row.original.inn}</span>
	},
	{
		header: 'КПП',
		accessorKey: 'kpp',
		cell: ({ row }) => <span>{row.original.kpp ? row.original.kpp : '-'}</span>
	},
	{
		header: 'ОГРН/ОГРНИП',
		accessorKey: 'registration_number',
		cell: ({ row }) => <span>{row.original.registration_number ? row.original.registration_number : '-'}</span>
	},
	{
		id: 'actions',
		header: () => <div className='text-right'>Действия</div>,
		cell: ({ row }) => {
			return (
				<div className='flex justify-end'>
					<OrganizationActions organization={row.original} />
				</div>
			)
		}
	}
]
