import { Controller } from 'react-hook-form'
import { Checkbox } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { useFormField } from '../hooks/useFormField'
import s from '../styles/Forms.module.scss'
import { FormCheckboxProps } from '../types/Forms.types'

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, labelStyle, className, ...props }) => {
	const { control, error, checkBoxId } = useFormField(name)

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div className={cn(s.formCheckbox, className)}>
					<Checkbox
						id={checkBoxId}
						onCheckedChange={field.onChange}
						className={error && s.formCheckbox__error}
						{...field}
						{...props}
					/>
					{label && (
						<label
							htmlFor={checkBoxId}
							className={cn(s.formCheckbox__label, error && s.formCheckbox__label__error, labelStyle)}
						>
							{label}
						</label>
					)}
				</div>
			)}
		></Controller>
	)
}
