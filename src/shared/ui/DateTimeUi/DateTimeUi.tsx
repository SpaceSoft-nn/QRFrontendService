import React from 'react'
import { cn, formatDateTime } from '@/shared/lib/utils'

interface DateTimeProps extends React.HTMLAttributes<HTMLDivElement> {
	dateTime: string
}

export const DateTimeUi = React.forwardRef<HTMLDivElement, DateTimeProps>(
	({ className, dateTime, children, ...props }, ref) => (
		<div ref={ref} className={cn('text-xs text-muted-foreground', className)} {...props}>
			{children} {formatDateTime(dateTime)}
		</div>
	)
)
