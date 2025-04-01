import { useForm } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { User } from 'lucide-react'
import { FormCheckbox, FormCommand, FormDateInput, FormInput, FormSelect } from '@/shared/ui/Forms'

const items = [
	{
		value: '1',
		label: 'Item 1',
		description: 'Item 1 description',
		icon: User
	},
	{
		value: '2',
		label: 'Item 2',
		description: 'Item 2 description',
		icon: User
	},
	{
		value: '3',
		label: 'Item 3',
		description: 'Item 3 description',
		icon: User
	},
	{
		value: '4',
		label: 'Item 4',
		description: 'Item 4 description',
		icon: User
	}
]

export const HomePage = () => {
	const form = useForm()

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
			<FormProvider {...form}>
				<FormCommand items={items} name='item' />
				<FormDateInput name='date' />
				<FormInput name='input' placeholder='Введите текст' />
				<FormSelect name='select' items={items} placeholder='Select' />
				<FormCheckbox name='checkbox' label='Checkbox' />
			</FormProvider>
		</section>
	)
}
