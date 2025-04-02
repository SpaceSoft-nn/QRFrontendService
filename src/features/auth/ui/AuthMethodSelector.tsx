import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { FormInput } from '@/shared/ui/Forms'
import { AuthMethod } from '../model'

export const AuthMethodSelector = ({ disabled }: { disabled?: boolean }) => {
	const { watch, setValue, clearErrors, getValues } = useFormContext()
	const authMethod = watch('authMethod') as AuthMethod

	useEffect(() => {
		const currentMethod = getValues('authMethod')
		if (currentMethod === 'email') {
			setValue('phone', '')
			clearErrors('phone')
		} else {
			setValue('email', '')
			clearErrors('email')
		}
	}, [authMethod, setValue, clearErrors, getValues])

	return (
		<Tabs value={authMethod} onValueChange={value => setValue('authMethod', value as AuthMethod)}>
			<TabsList className='w-full'>
				<TabsTrigger value='email' className='w-full' disabled={disabled}>
					Email
				</TabsTrigger>
				<TabsTrigger value='phone' className='w-full' disabled={disabled}>
					Телефон
				</TabsTrigger>
			</TabsList>
			<TabsContent value='email'>
				<FormInput name='email' placeholder='example@mail.com' autoComplete='email' disabled={disabled} />
			</TabsContent>
			<TabsContent value='phone'>
				<FormInput
					name='phone'
					placeholder='+7 000 000 00 00'
					mask='+79999999999'
					autoComplete='tel'
					disabled={disabled}
				/>
			</TabsContent>
		</Tabs>
	)
}
