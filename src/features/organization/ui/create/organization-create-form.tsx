import { VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { OrganizationSuggestions } from '@/features/organization'
import { organizationStore, PartySuggestionsValue } from '@/entities/organization'
import { userStore } from '@/entities/user'
import {
	Button,
	buttonVariants,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui'
import { Form } from '@/shared/ui/Forms'
import { UserRoleEnum } from '@/shared/api/graphql'

interface OrganizationCreateFormProps extends VariantProps<typeof buttonVariants> {
	children?: React.ReactNode
	className?: string
}

export const OrganizationCreateForm = observer<OrganizationCreateFormProps>(
	({ children, className, variant, size }) => {
		const { loading, createOrganization } = organizationStore
		const { user } = userStore
		const [isOpen, setIsOpen] = useState(false)

		const form = useForm<NonNullable<PartySuggestionsValue>>()

		const handleSubmit = async (data: NonNullable<PartySuggestionsValue>) => {
			await createOrganization(data)
			form.reset()
			setIsOpen(false)
		}

		const defaultTrigger = () => {
			return (
				<Button variant={variant} size={size} icon={Plus} className={className}>
					Добавить
				</Button>
			)
		}
		if (user?.role === UserRoleEnum.Cassier) return null

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
						<Button type='submit' disabled={!form.getValues('data')} loading={loading}>
							Создать
						</Button>
					</Form>
				</DialogContent>
			</Dialog>
		)
	}
)
