import { CommandLoading } from 'cmdk'
import { useState } from 'react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/shared/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { cn, commandFilter } from '@/shared/lib'
import { Skeleton } from '../..'
import { BaseFormField } from '../BaseFormField'
import { useFormField } from '../hooks/useFormField'
import s from '../styles/Forms.module.scss'
import { FormCommandProps } from '../types/Forms.types'

const CommandGroupSkeleton = () => {
	return (
		<div className='flex flex-col gap-1'>
			{Array.from({ length: 3 }).map((_, index) => (
				<Skeleton key={index} className='h-6 rounded w-full' />
			))}
		</div>
	)
}

export const FormCommand: React.FC<FormCommandProps> = ({
	items,
	name,
	label,
	labelStyle,
	required,
	placeholder = 'Выберите...',
	emptyMessage = 'Ничего не найдено',
	description,
	actions,
	disabled,
	loading,
	fetchError,
	onOpen,
	variant = 'outline',
	size,
	...props
}) => {
	const [open, setOpen] = useState(false)
	const { control, error } = useFormField(name)

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen)
		if (isOpen && onOpen) {
			onOpen()
		}
	}

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<BaseFormField
					name={name}
					label={label}
					labelStyle={labelStyle}
					required={required}
					description={description}
					error={error || fetchError}
				>
					<Popover open={open} onOpenChange={handleOpenChange}>
						<PopoverTrigger asChild className={cn(s.formField__input, error && s.formField__input__error)}>
							<Button
								variant={variant}
								size={size}
								role='combobox'
								aria-controls='command-list'
								disabled={disabled}
								className={cn(s.formField__input__btnTrigger, !field.value && 'text-muted-foreground')}
							>
								{field.value ? items.find(item => item.value === field.value)?.label : placeholder}
								<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='!p-0' align='start'>
							<Command {...props} onValueChange={field.onChange} filter={commandFilter(items)}>
								<CommandInput placeholder='Поиск' disabled={loading} enterKeyHint='search' />
								<CommandList>
									{actions && (
										<React.Fragment>
											<CommandGroup className='flex flex-col gap-2 w-full sticky top-0 z-10 bg-background'>
												{actions}
											</CommandGroup>
											<CommandSeparator />
										</React.Fragment>
									)}
									<CommandGroup>
										{loading ? (
											<CommandGroupSkeleton />
										) : (
											items.map(item => (
												<CommandItem
													key={item.value}
													value={item.value}
													disabled={item.disabled}
													onSelect={value => {
														field.onChange(value)
														props.onValueChange?.(value, item.label)
														setOpen(false)
													}}
												>
													<div className='flex items-center gap-3'>
														{item.icon && <item.icon />}
														<div className='flex flex-col'>
															<span className='text-sm'>{item.label}</span>
															<span className='text-sm text-muted-foreground'>
																{item.description}
															</span>
														</div>
													</div>
													<Check
														className={cn(
															'ml-auto',
															item.value === field.value ? 'opacity-100' : 'opacity-0'
														)}
														strokeWidth={3}
													/>
												</CommandItem>
											))
										)}
									</CommandGroup>
									{!loading && <CommandEmpty>{emptyMessage}</CommandEmpty>}
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</BaseFormField>
			)}
		/>
	)
}
