import { cn } from '@/shared/lib'
import { Skeleton } from '../skeleton'

interface SkeletonListUiProps {
	length: number
	className?: string
}

export const SkeletonListUi = ({ length, className }: SkeletonListUiProps) => {
	return Array.from({ length }).map((_, index) => <Skeleton key={index} className={cn('h-52 w-full', className)} />)
}
