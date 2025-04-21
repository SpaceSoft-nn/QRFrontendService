import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { PaginatorInfo } from '@/shared/api/graphql'
import { cn } from '@/shared/lib/utils'
import { Button } from '../button'

interface PaginationUiProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	pagination: PaginatorInfo
	loading?: boolean
	onChangePage: (page: number) => void
}

export const PaginationUi = ({ pagination, onChangePage, loading, className, ...props }: PaginationUiProps) => {
	const toFirstPage = () => onChangePage(1)
	const toPreviousPage = () => onChangePage(pagination.currentPage - 1)
	const toNextPage = () => onChangePage(pagination.currentPage + 1)
	const toLastPage = () => onChangePage(pagination.totalPages)

	return (
		<div
			className={cn('flex border justify-between items-center p-4 rounded-lg h-10 bg-card', className)}
			{...props}
		>
			<div className='flex'>
				<Button
					variant='ghost'
					size='icon'
					icon={ChevronsLeftIcon}
					tooltip='Первая страница'
					onClick={toFirstPage}
					disabled={pagination.currentPage === 1 || loading}
				/>
				<Button
					variant='ghost'
					size='icon'
					icon={ChevronLeftIcon}
					tooltip='Предыдущая страница'
					onClick={toPreviousPage}
					disabled={pagination.currentPage === 1 || loading}
				/>

				<Button
					variant='ghost'
					size='icon'
					icon={ChevronRightIcon}
					tooltip='Следующая страница'
					onClick={toNextPage}
					disabled={pagination.currentPage === pagination.totalPages || loading}
				/>
				<Button
					variant='ghost'
					size='icon'
					icon={ChevronsRightIcon}
					tooltip='Последняя страница'
					onClick={toLastPage}
					disabled={pagination.currentPage === pagination.totalPages || loading}
				/>
			</div>
			<span className='text-sm text-muted-foreground'>
				{pagination.currentPage} / {pagination.totalPages}
			</span>
		</div>
	)
}
