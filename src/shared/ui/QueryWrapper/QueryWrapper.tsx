import { ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { ApolloError } from '@apollo/client'
import { cn } from '@/shared/lib/utils'
import { Button } from '../button'
import { LoaderUi } from '../LoaderUi/LoaderUi'

interface QueryWrapperProps<T> {
	loading: boolean
	error?: ApolloError | null
	children: ReactNode
	refetch?: () => void
	className?: string
	data?: T | null
	emptyComponent?: ReactNode
}

export function QueryWrapper<T>({
	loading,
	error,
	children,
	refetch,
	data,
	emptyComponent,
	className
}: QueryWrapperProps<T>) {
	if (loading) return <LoaderUi />
	if (error) {
		const errorMessage = error.networkError ? 'Ошибка сети' : error.graphQLErrors?.[0]?.message || error.message
		return (
			<div className={cn('flex flex-col items-center justify-center w-full h-full p-4', className)}>
				<h2 className='text-xl font-bold mb-2'>Ошибка</h2>
				<p className='text-muted-foreground mb-4 text-center'>{errorMessage}</p>
				{refetch && (
					<Button onClick={refetch} icon={RefreshCw} size='xs' className='mt-4'>
						Попробовать снова
					</Button>
				)}
			</div>
		)
	}

	if (!data || (Array.isArray(data) && data.length === 0)) {
		if (emptyComponent) {
			return <div className={className}>{emptyComponent}</div>
		}

		return (
			<div className={cn('flex flex-col items-center justify-center w-full h-full p-4', className)}>
				<h2 className='text-muted-foreground text-center'>Ничего не найдено</h2>
			</div>
		)
	}

	return <div className={className}>{children}</div>
}
