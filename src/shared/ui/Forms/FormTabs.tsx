import type React from 'react'
import { Controller } from 'react-hook-form'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui'
import { cn } from '@/shared/lib'
import s from './forms.module.scss'
import type { FormTabsProps } from './Forms.types'
import { useFormField } from './hooks/useFormField'

export const FormTabs: React.FC<FormTabsProps> = ({
	name,
	label,
	labelStyle,
	required,
	items,
	className,
	orientation = 'horizontal',
	...props
}) => {
	const { control, error } = useFormField(name)

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Tabs
					onValueChange={field.onChange}
					defaultValue={field.value}
					value={field.value}
					orientation={orientation}
					className={className}
					{...props}
				>
					<TabsList className={cn(error && s.formField__input__error)}>
						{items.map(item => (
							<TabsTrigger key={item.value} value={item.value}>
								{item.label}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			)}
		/>
	)
}
