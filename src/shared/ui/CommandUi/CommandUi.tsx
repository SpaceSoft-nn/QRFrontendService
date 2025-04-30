import { VariantProps } from 'class-variance-authority'
import React, { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/shared/ui/command'
import { SelectItem } from '@/shared/ui/Forms'
import { cn, commandFilter } from '@/shared/lib'
import { Button, buttonVariants } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Skeleton } from '../skeleton'

type PopoverContentProps = React.ComponentProps<typeof PopoverContent>

export interface CommandUiProps
	extends Omit<React.ComponentProps<typeof Command>, 'onValueChange'>,
		VariantProps<typeof buttonVariants> {
	items: SelectItem[]
	disabled?: boolean
	loading?: boolean
	placeholder: string
	emptyMessage?: string
	fetchError?: string | null
	trigger?: JSX.Element
	triggerClassName?: string
	actions?: JSX.Element
	align?: PopoverContentProps['align']
	onValueChange?: (value: string, label: string) => void
	onOpen?: () => void
}

const CommandDataSkeleton = () => {
	return (
		<div className='flex flex-col gap-1'>
			{Array.from({ length: 3 }).map((_, index) => (
				<Skeleton key={index} className='h-6 rounded w-full' />
			))}
		</div>
	)
}

export const CommandUi = ({
	items,
	loading,
	onValueChange,
	onOpen,
	placeholder,
	emptyMessage = 'Ничего не найдено',
	fetchError,
	value,
	variant,
	size,
	disabled,
	trigger,
	actions,
	align = 'end',
	triggerClassName,
	...props
}: CommandUiProps) => {
	const [open, setOpen] = useState(false)

	const handleOpenChange = (isOpen: boolean) => {
		if (isOpen && onOpen) {
			onOpen()
		}
		setOpen(isOpen)
	}

	const handleOnSelect = (value: string, label: string) => {
		if (onValueChange) {
			onValueChange(value, label)
		}
		setOpen(false)
	}

	const CommandItems = () => {
		return items.map(item => (
			<CommandItem
				key={item.value}
				value={item.value}
				disabled={item.disabled}
				onSelect={() => handleOnSelect(item.value, item.label)}
			>
				<div className='flex items-center gap-3'>
					{item.icon && <item.icon />}
					<div className='flex flex-col'>
						<span className='text-sm'>{item.label}</span>
						<span className='text-sm text-muted-foreground'>{item.description}</span>
					</div>
				</div>
				<Check className={cn('ml-auto', item.value === value ? 'opacity-100' : 'opacity-0')} strokeWidth={3} />
			</CommandItem>
		))
	}

	const CommandActions = () => {
		if (!actions) return null

		return (
			<React.Fragment>
				<CommandGroup className='flex flex-col gap-2 w-full sticky top-0 z-10 bg-background'>
					{actions}
				</CommandGroup>
				<CommandSeparator />
			</React.Fragment>
		)
	}

	const CommandData = () => {
		if (loading) return <CommandDataSkeleton />
		if (fetchError) return <CommandEmpty className='text-destructive px-2 truncate'>{fetchError}</CommandEmpty>
		return (
			<React.Fragment>
				<CommandItems />
			</React.Fragment>
		)
	}

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild className={triggerClassName}>
				{trigger ? (
					trigger
				) : (
					<Button
						variant={variant}
						size={size}
						iconDir='right'
						icon={ChevronsUpDown}
						disabled={disabled}
						role='combobox'
						aria-controls='command-list'
						aria-expanded={open}
						aria-haspopup='dialog'
						type='button'
					>
						{value ? items.find(item => item.value === value)?.label : placeholder}
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent className='!p-0' align={align}>
				<Command {...props} filter={commandFilter(items)}>
					<CommandInput placeholder='Поиск' disabled={loading} />
					<CommandList>
						<CommandActions />
						<CommandGroup>
							<CommandData />
						</CommandGroup>
						{!loading && <CommandEmpty>{emptyMessage}</CommandEmpty>}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
