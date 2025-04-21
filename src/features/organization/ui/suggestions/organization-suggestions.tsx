import { PartySuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { Controller } from 'react-hook-form'
import { OrganizationSuggestionsProps, PartySuggestionsProps } from '@/features/organization'
import { Input } from '@/shared/ui'
import { BaseFormField, useFormField } from '@/shared/ui/Forms'
import formStyles from '@/shared/ui/Forms/styles/Forms.module.scss'
import { cn } from '@/shared/lib/utils'
import s from './organization-suggestions.module.scss'

const DaDataSuggestions = (props: PartySuggestionsProps) => {
	return (
		<PartySuggestions
			token={import.meta.env.VITE_API_KEY_DADATA}
			count={5}
			delay={300}
			value={props.value}
			{...props}
		/>
	)
}

export const OrganizationSuggestions = ({
	name,
	label,
	placeholder = 'ИНН или название организации',
	className,
	required,
	description,
	disabled,
	...props
}: OrganizationSuggestionsProps) => {
	const { control, error } = useFormField(name)

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<BaseFormField name={name} label={label} description={description} error={error} required={required}>
					<DaDataSuggestions
						inputProps={{
							name: field.name,
							placeholder,
							disabled,
							className: cn(
								formStyles.formField__input,
								error && formStyles.formField__input_error,
								className
							),
							autoComplete: 'off',
							autoCapitalize: 'off',
							autoCorrect: 'off',
							type: 'text'
						}}
						suggestionsClassName={s.suggestions__list}
						suggestionClassName={s.suggestion}
						minChars={1}
						currentSuggestionClassName={s.suggestion__current}
						customInput={Input}
						filterStatus={['ACTIVE']}
						{...props}
					/>
				</BaseFormField>
			)}
		/>
	)
}
