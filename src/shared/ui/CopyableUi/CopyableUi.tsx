import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'

interface CopyableUiProps
	extends Omit<React.ComponentProps<typeof Button>, 'onClick' | 'icon' | 'onMouseEnter' | 'onMouseLeave'> {
	value: string
}

export const CopyableUi = ({ value, className, children, ...props }: CopyableUiProps) => {
	const [isCopied, setIsCopied] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(value)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 700)
	}

	return (
		<Button
			variant='ghost'
			size='xs'
			onClick={handleCopy}
			tooltip={isCopied ? 'Скопировано' : 'Скопировать'}
			className={cn('flex text-sm !px-[2px] font-normal justify-start gap-1 items-center w-fit', className)}
			{...props}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isCopied ? <CheckIcon className='w-4 h-4' /> : isHovered ? <CopyIcon className='w-4 h-4' /> : null}
			{children ?? value}
		</Button>
	)
}
