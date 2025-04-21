import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserPlusIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { AuthMethodSelector } from '@/features/auth/ui/AuthMethodSelector'
import { memberRolesOptions, membersStore } from '@/entities/members'
import { organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Form, FormInput, FormTabs } from '@/shared/ui/Forms'
import { UserCreate, UserRoleEnum } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'

export const CreateMemberForm = observer(() => {
	const [open, setOpen] = useState(false)
	const { activeOrganization } = organizationStore
	const { personalArea } = userStore
	const { loading, error } = membersStore

	const form = useForm<UserCreate>({
		defaultValues: {
			organization_id: activeOrganization?.id,
			personalarea_id: personalArea?.id,
			role: UserRoleEnum.Cassier
		}
	})

	useEffect(() => {
		if (activeOrganization?.id && personalArea?.id) {
			form.setValue('organization_id', activeOrganization.id)
			form.setValue('personalarea_id', personalArea.id)
		}
	}, [activeOrganization?.id, personalArea?.id, form])

	const onSubmit = async (data: UserCreate) => {
		const success = await membersStore.createMember(data)
		if (success) {
			toast({
				title: 'Пользователь успешно создан'
			})
			form.reset()
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' icon={UserPlusIcon}>
					Создать пользователя
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание нового пользователя</DialogTitle>
					<DialogDescription>
						После создания пользователя, он будет добавлен в вашу организацию, отправьте ему данные для
						входа в систему.
					</DialogDescription>
				</DialogHeader>
				<Form ctx={form} onSubmit={onSubmit} className='flex flex-col gap-4'>
					<FormTabs
						name='role'
						label='Роль'
						items={memberRolesOptions}
						defaultValue={memberRolesOptions[0].value}
						disabled={loading}
					/>
					<AuthMethodSelector />
					<FormInput name='last_name' placeholder='Фамилия' autoComplete='last_name' disabled={loading} />
					<FormInput name='first_name' placeholder='Имя' autoComplete='first_name' disabled={loading} />
					<FormInput
						name='father_name'
						placeholder='Отчество'
						autoComplete='father_name'
						disabled={loading}
					/>
					<FormInput
						type='password'
						name='password'
						placeholder='Пароль'
						autoComplete='new-password'
						disabled={loading}
					/>
					<FormInput
						type='password'
						name='password_confirmation'
						placeholder='Подтверждение пароля'
						autoComplete='new-password'
						disabled={loading}
					/>
					<Button type='submit' icon={UserPlusIcon} loading={loading}>
						Создать
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	)
})
