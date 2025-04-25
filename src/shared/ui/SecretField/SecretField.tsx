import { useState } from 'react'
import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import { Button, Input } from '@/shared/ui'
import { cn } from '@/shared/lib'

interface SecretFieldProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string
	label?: string
	hideValue?: boolean
}

export function SecretField({ value, label, hideValue = true, className, ...props }: SecretFieldProps) {
	const [isHidden, setIsHidden] = useState(hideValue)
	const [isCopied, setIsCopied] = useState(false)

	const handleToggleVisibility = () => {
		setIsHidden(!isHidden)
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value)
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	const displayValue = isHidden ? '*'.repeat(Math.min(value.length, 24)) : value

	return (
		<div className={cn('w-full space-y-1.5', className)} {...props}>
			{label && <label className='text-sm'>{label}</label>}
			<div className='flex items-center gap-2'>
				<div className='relative flex-1'>
					<Input value={displayValue} readOnly className='pr-10' />
					<Button
						type='button'
						onClick={handleToggleVisibility}
						variant='ghost'
						size='icon'
						className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8'
						aria-label={isHidden ? 'Показать ключ' : 'Скрыть ключ'}
					>
						{isHidden ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
					</Button>
				</div>
				<Button type='button' onClick={handleCopy} variant='outline' size='icon' aria-label='Копировать ключ'>
					{isCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
				</Button>
			</div>
		</div>
	)
}
