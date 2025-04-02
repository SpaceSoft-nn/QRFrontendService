import { FormHTMLAttributes } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

type FormPropsWithoutSubmit = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

interface FormProps<T extends object> extends FormPropsWithoutSubmit {
	ctx: UseFormReturn<T>
	onSubmit: (data: T) => void | Promise<void>
}

export const Form = <T extends object>({ children, ctx, onSubmit, ...props }: FormProps<T>) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') {
			ctx.handleSubmit(onSubmit)()
		}
	}

	return (
		<FormProvider {...ctx}>
			<form onSubmit={ctx.handleSubmit(onSubmit)} onKeyDown={handleKeyDown} {...props}>
				{children}
			</form>
		</FormProvider>
	)
}
