import { Skeleton } from '@/shared/ui'

export const HomePage = () => {
	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
			<Skeleton className='h-[300px] w-full' />
			<Skeleton className='h-[300px] w-full' />
			<Skeleton className='h-[300px] w-full' />
			<Skeleton className='h-[300px] w-full' />
			<Skeleton className='h-[300px] w-full' />
			<Skeleton className='h-[300px] w-full' />
		</section>
	)
}
