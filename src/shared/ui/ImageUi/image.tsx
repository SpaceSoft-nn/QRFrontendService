import { useState } from 'react'
import { Skeleton } from '@/shared/ui/skeleton'
import { cn } from '@/shared/lib/utils'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	fallback?: React.ReactNode
	fallbackText?: string
	containerClassName?: string
	skeletonClassName?: string
}

export const Image = ({
	src,
	alt,
	className,
	containerClassName,
	skeletonClassName,
	fallback,
	fallbackText = 'Не удалось отобразить изображение',
	onError,
	...props
}: ImageProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	const handleLoad = () => {
		setIsLoading(false)
	}

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		setIsLoading(false)
		setHasError(true)
		if (onError) {
			onError(e)
		}
	}

	return (
		<div className={cn('relative', containerClassName)}>
			{isLoading && <Skeleton className={cn('w-full h-full', skeletonClassName)} />}

			{!hasError ? (
				<img
					src={src}
					alt={alt}
					className={cn(
						isLoading ? 'opacity-0' : 'opacity-100',
						'transition-opacity duration-300',
						className
					)}
					onLoad={handleLoad}
					onError={handleError}
					{...props}
				/>
			) : (
				<div
					className={cn(
						'flex items-center justify-center bg-background text-muted-foreground text-sm p-4 rounded',
						className
					)}
				>
					{fallback || fallbackText}
				</div>
			)}
		</div>
	)
}
