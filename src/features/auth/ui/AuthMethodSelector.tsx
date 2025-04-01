import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { FormInput } from '@/shared/ui/Forms'
import { AuthMethod } from '../model'

export const AuthMethodSelector = () => {
	const { watch, setValue, clearErrors } = useFormContext()
	const authMethod = watch('authMethod') as AuthMethod

	useEffect(() => {
		if (authMethod === 'email') {
			setValue('phone', '')
			clearErrors('phone')
		} else {
			setValue('email', '')
			clearErrors('email')
		}
	}, [authMethod, setValue, clearErrors])

	return (
		<Tabs defaultValue={authMethod} onValueChange={value => setValue('authMethod', value as AuthMethod)}>
			<TabsList className='w-full'>
				<TabsTrigger value='email' className='w-full'>
					Email
				</TabsTrigger>
				<TabsTrigger value='phone' className='w-full'>
					Телефон
				</TabsTrigger>
			</TabsList>
			<TabsContent value='email'>
				<FormInput name='email' placeholder='example@mail.com' autoComplete='off' />
			</TabsContent>
			<TabsContent value='phone'>
				<FormInput name='phone' placeholder='+7 000 000 00 00' autoComplete='off' mask='+79999999999' />
			</TabsContent>
		</Tabs>
	)
}
