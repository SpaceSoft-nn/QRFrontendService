import { Controller } from 'react-hook-form'
import { Checkbox } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { FormCheckboxProps } from '../Forms.types'
import { useFormField } from '../hooks/useFormField'
import s from './FormCheckbox.module.scss'

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, labelStyle, className, ...props }) => {
	const { control, error } = useFormField(name)

	const checkboxId = `checkbox-${name}`

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div className={cn(s.formCheckbox, className)}>
					<Checkbox
						id={checkboxId}
						onCheckedChange={field.onChange}
						className={error && s.formCheckbox__error}
						{...field}
						{...props}
					/>
					{label && (
						<label
							htmlFor={checkboxId}
							className={cn(s.formCheckbox__label, s.formCheckbox__label__error && error, labelStyle)}
						>
							{label}
						</label>
					)}
				</div>
			)}
		></Controller>
	)
}
