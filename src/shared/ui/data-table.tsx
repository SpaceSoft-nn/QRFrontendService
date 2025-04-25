import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Skeleton } from '@/shared/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { cn } from '@/shared/lib'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	loading?: boolean
	emptyText?: string
	error?: string | null
	pageSize?: number
}

export function DataTable<TData, TValue>({
	columns,
	data,
	loading,
	emptyText = 'Ничего не найдено',
	error = 'Ошибка при загрузке данных',
	pageSize = 15
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: pageSize
			}
		}
	})

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<TableHead key={header.id}>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							)
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{loading ? (
					Array.from({ length: 5 }).map((_, index) => (
						<TableRow key={index}>
							{Array.from({ length: columns.length }).map((_, index) => (
								<TableCell key={index}>
									<Skeleton className='h-5' />
								</TableCell>
							))}
						</TableRow>
					))
				) : table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map(row => (
						<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
							{row.getVisibleCells().map(cell => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow className='hover:bg-inherit'>
						<TableCell
							colSpan={columns.length}
							className={cn('h-24 text-center', error !== null && 'text-destructive')}
						>
							{error !== null ? error : emptyText}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
