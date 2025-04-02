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
import { cn } from '@/shared/lib'
import { BaseFormField } from '../BaseFormField'
import { useFormField } from '../hooks/useFormField'
import s from '../styles/Forms.module.scss'
import { FormCommandProps } from '../types/Forms.types'

export const FormCommand: React.FC<FormCommandProps> = ({
	items,
	name,
	label,
	labelStyle,
	required,
	placeholder = 'Выберите...',
	emptyMessage = 'Ничего не найдено',
	actions,
	disabled,
	loading,
	...props
}) => {
	const [open, setOpen] = useState(false)
	const { control, error } = useFormField(name)

	const filter = (value: string, search: string) => {
		if (!search) return 1
		const item = items.find(item => item.value === value)
		if (!item) return 0
		const searchLower = search.toLowerCase()
		return item.label.toLowerCase().includes(searchLower) ||
			(item.description && item.description.toLowerCase().includes(searchLower))
			? 1
			: 0
	}

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<BaseFormField name={name} label={label} labelStyle={labelStyle} required={required} error={error}>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild className={cn(s.formField__input, error && s.formField__input__error)}>
							<Button
								variant='outline'
								role='combobox'
								aria-controls='command-list'
								disabled={disabled}
								loading={loading}
								className={cn(s.formField__input__btnTrigger, !field.value && 'text-muted-foreground')}
							>
								{field.value ? items.find(item => item.value === field.value)?.label : placeholder}
								<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='!p-0' align='end'>
							<Command {...props} onValueChange={field.onChange} filter={filter}>
								<CommandInput placeholder='Поиск' />
								<CommandList>
									{actions && (
										<React.Fragment>
											<CommandGroup className='flex flex-col gap-2 sticky top-0 z-10 bg-background'>
												{actions}
											</CommandGroup>
											<CommandSeparator />
										</React.Fragment>
									)}
									<CommandGroup>
										{items.map(item => (
											<CommandItem
												key={item.value}
												value={item.value}
												disabled={item.disabled}
												onSelect={value => {
													field.onChange(value)
													setOpen(false)
													props.onValueChange?.(value, item.label)
												}}
											>
												<div className='flex items-center gap-3'>
													{item.icon && <item.icon />}
													<div className='flex flex-col'>
														<span className='text-sm font-medium'>{item.label}</span>
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
										))}
									</CommandGroup>

									<CommandEmpty>{emptyMessage}</CommandEmpty>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</BaseFormField>
			)}
		/>
	)
}
