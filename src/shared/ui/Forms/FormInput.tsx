import { useState } from 'react'
import { Input } from '@/shared/ui'
import { FormClearButton, FormShowPasswordButton } from '@/shared/ui/Forms'
import { cn, maskedInput } from '@/shared/lib'
import { BaseFormField } from './BaseFormField'
import s from './forms.module.scss'
import { FormInputProps } from './Forms.types'
import { useFormField } from './hooks/useFormField'

export const FormInput: React.FC<FormInputProps> = ({
	name,
	label,
	labelStyle,
	required,
	className,
	mask,
	type = 'text',
	...props
}) => {
	const { value, error, setValue, register, onClickClearButton } = useFormField(name)
	const [showPassword, setShowPassword] = useState(false)
	const [clearButtonVisible, setClearButtonVisible] = useState(false)

	const onClickShowPassword = () => setShowPassword(!showPassword)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const onlyDigits = value.replace(/\D/g, '')
		const maskedValue = mask ? maskedInput(onlyDigits, mask) : value
		setValue(name, maskedValue, { shouldValidate: true })
	}

	return (
		<BaseFormField
			name={name}
			label={label}
			labelStyle={labelStyle}
			required={required}
			className={className}
			error={error}
		>
			<div
				className='relative'
				tabIndex={-1}
				onMouseEnter={() => setClearButtonVisible(true)}
				onMouseLeave={() => setClearButtonVisible(false)}
			>
				<Input
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					className={cn(s.formField__input, error && s.formField__input__error)}
					{...register(name)}
					onChange={handleInputChange}
					{...props}
				/>
				<div className={s.formField__buttons}>
					{clearButtonVisible && value && !props.readOnly && !props.disabled && type !== 'number' && (
						<FormClearButton onClick={onClickClearButton} />
					)}
					{type === 'password' && (
						<FormShowPasswordButton showPassword={showPassword} onClick={onClickShowPassword} />
					)}
				</div>
			</div>
		</BaseFormField>
	)
}
