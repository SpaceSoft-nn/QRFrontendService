import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/shared/ui/skeleton'
import { cn } from '@/shared/lib/utils/tw-merge'

const cardVariants = cva('rounded-xl border bg-card text-card-foreground shadow', {
	variants: {
		variant: {
			default: '',
			hover: 'hover:bg-muted/50 transition-all duration-300',
			'dashed-hover': 'border-dashed hover:bg-muted/50 transition-all duration-300'
		},
		size: {
			xs: 'p-2',
			sm: 'p-4',
			md: 'p-6',
			lg: 'p-8'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'md'
	}
})

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
	href?: string
	loading?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant = 'default', size = 'md', href, loading, ...props }, ref) =>
		href ? (
			<Link to={href}>
				<div ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props} />
			</Link>
		) : loading ? (
			<Skeleton className={cn(cardVariants({ variant, size }), className)} {...props} />
		) : (
			<div ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props} />
		)
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
	)
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
	)
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
	)
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('pt-4', className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
