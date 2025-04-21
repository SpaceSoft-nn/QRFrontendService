import { cn } from '@/shared/lib/utils'

type DataItemOrientation = 'vertical' | 'horizontal'

interface DataItemProps extends React.HTMLAttributes<HTMLDivElement> {
	label: React.ReactNode
	data: React.ReactNode
	orientation?: DataItemOrientation
}

export const DataItem = ({ label, data, orientation = 'vertical', ...props }: DataItemProps) => {
	return (
		<div className={cn('flex gap-[1px]', orientation === 'vertical' ? 'flex-col' : 'flex-row')} {...props}>
			<span className='text-muted-foreground'>{label}</span>
			<span>{data}</span>
		</div>
	)
}
