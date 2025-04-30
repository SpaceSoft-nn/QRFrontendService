import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserPlusIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthMethodSelector } from '@/features/auth/ui/method-selector/AuthMethodSelector'
import { memberRolesOptions, organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Form, FormInput, FormTabs } from '@/shared/ui/Forms'
import { UserCreate, UserRoleEnum } from '@/shared/api/graphql'
import { createOrganizationMemberSchema } from './create-member.schema'

interface CreateOrganizationMemberFormProps
	extends Pick<React.ComponentProps<typeof Button>, 'size' | 'variant' | 'className'> {}

export const CreateOrganizationMemberForm = observer<CreateOrganizationMemberFormProps>(({ ...props }) => {
	const [open, setOpen] = useState(false)
	const { user } = userStore
	const { loading, createOrganizationMember } = organizationStore

	const form = useForm<UserCreate>({
		resolver: zodResolver(createOrganizationMemberSchema),
		defaultValues: {
			// @ts-ignore
			authMethod: 'email',
			role: UserRoleEnum.Cassier
		}
	})

	const onSubmit = async (data: UserCreate) => {
		const success = await createOrganizationMember(data)
		if (success) {
			form.reset()
			setOpen(false)
		}
	}

	if (user?.role === UserRoleEnum.Cassier) return null

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button icon={UserPlusIcon} {...props}>
					Создать
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
					<Button type='submit' icon={UserPlusIcon} loading={loading} disabled={!form.formState.isValid}>
						Создать
					</Button>
				</Form>
			</DialogContent>
		</Dialog>
	)
})
