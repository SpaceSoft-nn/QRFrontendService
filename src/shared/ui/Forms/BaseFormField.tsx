import { ReactNode } from 'react'
import { FormErrorMessage, FormRequiredSymbol } from '@/shared/ui/Forms'
import { cn } from '@/shared/lib'
import s from './forms.module.scss'

interface BaseFormFieldProps {
	name: string
	label?: string
	labelStyle?: string
	required?: boolean
	className?: string
	error?: string
	children: ReactNode
}

export const BaseFormField: React.FC<BaseFormFieldProps> = ({
	label,
	labelStyle,
	required,
	className,
	error,
	children
}) => {
	return (
		<div className={cn(s.formField, className)}>
			{label && (
				<p className={labelStyle}>
					{label} {required && <FormRequiredSymbol />}
				</p>
			)}
			{children}
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</div>
	)
}
