import type { DayPickerProps } from 'react-day-picker'
import type { CheckboxProps } from '@radix-ui/react-checkbox'
import type { SelectProps } from '@radix-ui/react-select'
import type { TabsProps } from '@radix-ui/react-tabs'
import type { Command } from '@/shared/ui/command'

export type SelectItem = {
	value: string
	label: string
	icon?: React.ElementType
	description?: string
	disabled?: boolean
}

export interface BaseFormFieldProps {
	name: string
	label?: string
	labelStyle?: string
	placeholder?: string
	required?: boolean
	disabled?: boolean
	className?: string
	description?: string
}

export interface FormCheckboxProps extends Omit<CheckboxProps, 'name'>, Omit<BaseFormFieldProps, 'label'> {
	label?: string | JSX.Element
}

export interface FormDateInputProps extends Omit<DayPickerProps, 'mode' | 'disabled'>, BaseFormFieldProps {
	dateType?: string
	value?: string
	onChange?: (date: string) => void
	mode?: 'single'
}

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>, BaseFormFieldProps {
	mask?: string
}

export interface FormSelectProps extends Omit<SelectProps, 'name'>, BaseFormFieldProps {
	items: SelectItem[]
	endAdorment?: JSX.Element
}

export interface FormTextareaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>,
		BaseFormFieldProps {}

export interface FormTabsProps extends Omit<BaseFormFieldProps, 'placeholder'>, TabsProps {
	items: SelectItem[]
}

export interface FormCommandProps
	extends Omit<BaseFormFieldProps, 'onChange'>,
		Omit<React.ComponentPropsWithoutRef<typeof Command>, 'onValueChange'> {
	items: SelectItem[]
	disabled?: boolean
	loading?: boolean
	emptyMessage?: string
	fetchError?: string | null
	actions?: JSX.Element
	onValueChange?: (value: string, label: string) => void
	onOpen?: () => void
}
