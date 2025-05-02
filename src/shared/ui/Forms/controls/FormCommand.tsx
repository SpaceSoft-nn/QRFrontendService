import { Controller } from 'react-hook-form'
import { cn } from '@/shared/lib'
import { CommandUi } from '../..'
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
	description,
	loading,
	fetchError,
	onOpen,
	variant = 'outline',
	size,
	...props
}) => {
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
					description={description}
					error={error || fetchError}
				>
					<CommandUi
						variant={variant}
						onOpen={onOpen}
						value={field.value}
						loading={loading}
						onValueChange={field.onChange}
						triggerClassName={cn(s.formField__input, error && s.formField__input__error)}
						triggerBtnClassName={cn(
							s.formField__input__btnTrigger,
							!field.value && 'text-muted-foreground'
						)}
						items={items}
						{...props}
					/>
				</BaseFormField>
			)}
		/>
	)
}
