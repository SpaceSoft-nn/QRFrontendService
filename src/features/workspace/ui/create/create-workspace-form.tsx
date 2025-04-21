import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { organizationStore } from '@/entities/organization'
import { PaymentMethodSelector } from '@/entities/payment-method'
import { workspaceStore } from '@/entities/workspace'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { FormErrorMessage, FormInput, FormTextarea } from '@/shared/ui/Forms'
import { Form } from '@/shared/ui/Forms'
import { WorkspaceCreateInput } from '@/shared/api/graphql'
import { createWorkspaceSchema } from './create-workspace.schema'

export const CreateWorkspaceForm = observer(() => {
	const { activeOrganization } = organizationStore
	const { loading, error } = workspaceStore
	const [open, setOpen] = useState(false)

	const form = useForm<WorkspaceCreateInput>({
		defaultValues: {
			organization_id: activeOrganization?.id
		},
		resolver: zodResolver(createWorkspaceSchema)
	})

	useEffect(() => {
		if (open) {
			form.reset({
				organization_id: activeOrganization?.id
			})
		}
	}, [open])

	const onSubmit = async (data: WorkspaceCreateInput) => {
		await workspaceStore.createWorkspace(data).then(res => {
			if (res) {
				setOpen(false)
				form.reset()
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' icon={Plus}>
					Добавить
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Добавление нового рабочего места</DialogTitle>
					<DialogDescription>Укажите название и выберите матод оплаты.</DialogDescription>
				</DialogHeader>
				<Form ctx={form} onSubmit={onSubmit} className='flex flex-col gap-4'>
					<FormInput name='name' placeholder='Название' disabled={loading} />
					<PaymentMethodSelector />
					<FormTextarea name='description' placeholder='Описание' disabled={loading} />
					{error ||
						(form.formState.errors.organization_id && (
							<FormErrorMessage>
								{error || form.formState.errors.organization_id?.message}
							</FormErrorMessage>
						))}
					<Button type='submit' loading={loading}>
						Создать
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	)
})
