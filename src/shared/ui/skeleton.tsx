import { cn } from '@/shared/lib/utils/tw-merge'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-shine rounded-xl bg-[linear-gradient(110deg,#f2f2f2,45%,#e5e5e5,55%,#f2f2f2)]',
				'bg-[length:400%_100%] transition-colors',
				'dark:bg-[linear-gradient(110deg,#001111,45%,#303030,55%,#001111)]',
				className
			)}
			{...props}
		/>
	)
}

export { Skeleton }
