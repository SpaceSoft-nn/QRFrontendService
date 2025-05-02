import { cva, VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const dataItemVariants = cva('w-full flex text-sm', {
	variants: {
		orientation: {
			vertical: 'flex-col gap-[1px]',
			horizontal: 'flex-row gap-2 justify-between items-center'
		}
	},
	defaultVariants: {
		orientation: 'vertical'
	}
})

interface DataItemType extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dataItemVariants> {
	icon?: React.ElementType
	link?: string
	hide?: boolean
	label?: React.ReactNode
	data: React.ReactNode
	dataClassName?: string
}

export const DataItem = ({
	label,
	data,
	orientation = 'horizontal',
	className,
	hide = false,
	icon: Icon,
	link,
	dataClassName,
	...props
}: DataItemType) => {
	if (hide) return null

	return (
		<div className={cn(dataItemVariants({ orientation }), className)} {...props}>
			{label && (
				<div className='flex items-center gap-2'>
					{Icon && <Icon className='w-4 h-4 text-primary' />}
					<span className='text-muted-foreground'>{label}</span>
				</div>
			)}
			{link ? (
				<Link to={link} className='link-underline flex items-center gap-1'>
					<ExternalLinkIcon className='w-4 h-4' />
					<span className={cn(orientation === 'horizontal' && 'text-right', dataClassName)}>{data}</span>
				</Link>
			) : (
				<span className={cn(orientation === 'horizontal' && 'text-right', dataClassName)}>{data}</span>
			)}
		</div>
	)
}

interface DataGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dataItemVariants> {
	data: DataItemType[]
}

export const DataGroup = ({ data, orientation, className, ...props }: DataGroupProps) => {
	return (
		<div className={cn('flex flex-col gap-1', className)} {...props}>
			{data.map((item, index) => (
				<DataItem key={index} orientation={orientation} {...item} />
			))}
		</div>
	)
}
