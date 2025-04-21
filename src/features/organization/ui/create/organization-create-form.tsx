import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { OrganizationSuggestions, PartySuggestionsValue } from '@/features/organization'
import { organizationStore } from '@/entities/organization'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui'
import { Form, FormErrorMessage } from '@/shared/ui/Forms'

interface OrganizationCreateFormProps {
	children?: React.ReactNode
}

export const OrganizationCreateForm = observer<OrganizationCreateFormProps>(({ children }) => {
	const { loading, error } = organizationStore
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<NonNullable<PartySuggestionsValue>>()

	const handleSubmit = async (data: NonNullable<PartySuggestionsValue>) => {
		await organizationStore.createOrganization(data)
		form.reset()
		setIsOpen(false)
	}

	const defaultTrigger = () => {
		return (
			<Button variant='outline' icon={Plus}>
				Добавить
			</Button>
		)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children || defaultTrigger()}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Добавить организацию</DialogTitle>
					<DialogDescription>
						Начните вводить название или ИНН организации и выберите ее из списка.
					</DialogDescription>
				</DialogHeader>
				<Form ctx={form} onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<OrganizationSuggestions
						name='data'
						disabled={loading}
						onChange={value => {
							if (value) {
								form.setValue('data', value.data)
							}
						}}
					/>
					{error && <FormErrorMessage>{error}</FormErrorMessage>}
					<Button type='submit' disabled={!form.getValues('data')} loading={loading}>
						Создать
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	)
})
