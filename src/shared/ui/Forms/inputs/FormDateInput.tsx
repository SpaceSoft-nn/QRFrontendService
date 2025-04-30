import type React from 'react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { BaseFormField } from '../BaseFormField'
import { useFormField } from '../hooks/useFormField'
import s from '../styles/Forms.module.scss'
import type { FormDateInputProps } from '../types/Forms.types'

export const FormDateInput: React.FC<FormDateInputProps> = ({
	name,
	required,
	labelStyle,
	label,
	dateType = 'dd.MM.yyyy',
	placeholder = 'Выберите дату',
	description,
	className,
	onChange,
	...calendarProps
}) => {
	const [open, setOpen] = useState(false)
	const { control, error } = useFormField(name)

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
					className={className}
					error={error}
					description={description}
				>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								type='button'
								variant='outline'
								className={cn(s.formField__input__btnTrigger, !field.value && 'text-muted-foreground')}
							>
								{field.value ? format(field.value, dateType) : placeholder}
								<CalendarIcon className='size-4 ml-auto opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0' align='end' side='bottom'>
							<Calendar
								mode='single'
								fromYear={2000}
								toYear={new Date().getFullYear() + 5}
								selected={field.value}
								defaultMonth={field.value}
								onSelect={selectedDate => {
									field.onChange(selectedDate)
									setOpen(false)
								}}
								captionLayout='dropdown'
								{...calendarProps}
							/>
						</PopoverContent>
					</Popover>
				</BaseFormField>
			)}
		/>
	)
}
