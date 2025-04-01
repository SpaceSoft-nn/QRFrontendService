import { Controller } from 'react-hook-form'
import { Textarea } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { BaseFormField } from '../BaseFormField'
import { FormClearButton } from '../buttons/FormClearButton'
import { useFormField } from '../hooks/useFormField'
import s from '../styles/Forms.module.scss'
import { FormTextareaProps } from '../types/Forms.types'

export const FormTextarea: React.FC<FormTextareaProps> = ({
	name,
	label,
	labelStyle,
	required,
	className,
	...props
}) => {
	const { control, error, value, onClickClearButton } = useFormField(name)

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<BaseFormField name={name} label={label} labelStyle={labelStyle} required={required} error={error}>
					<Textarea
						className={cn(s.formField__input, error && s.formField__input__error)}
						{...field}
						{...props}
					/>
					<div className={cn(s.formField__buttons, '!items-start !my-3')}>
						{value && <FormClearButton onClick={onClickClearButton} />}
					</div>
				</BaseFormField>
			)}
		></Controller>
	)
}
