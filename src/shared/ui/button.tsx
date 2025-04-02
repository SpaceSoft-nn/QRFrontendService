import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/shared/lib/utils/tw-merge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-9 px-4 py-2',
				xs: 'h-6 px-2 text-xs',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-8 w-8'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
	icon?: React.ElementType
	tooltip?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size = 'default',
			asChild = false,
			loading = false,
			children,
			icon: Icon,
			tooltip,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		const button = (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{Icon && !loading && (
					<Icon
						className={cn(
							{
								default: 'w-4 h-4',
								xs: 'w-3 h-3',
								sm: 'w-4 h-4',
								lg: 'w-5 h-5',
								icon: 'w-4 h-4'
							}[size as keyof typeof size],
							children && 'mr-2'
						)}
					/>
				)}
				{!loading ? children : <Loader2 className='w-5 h-5 animate-spin' />}
			</Comp>
		)

		if (!tooltip) return button

		return (
			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>{button}</TooltipTrigger>
					<TooltipContent>{tooltip}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
