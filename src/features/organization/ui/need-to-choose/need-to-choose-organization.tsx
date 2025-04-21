import { observer } from 'mobx-react-lite'
import { organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { OrganizationCreateForm } from '../create/organization-create-form'
import { urls } from '@/shared/config'

export const NeedToChooseOrganization = observer(() => {
	const { activeOrganization, organizations } = organizationStore

	if (activeOrganization) return null

	const needToChooseText = {
		title: organizations.length > 0 ? 'Выберите организацию' : 'Необходимо создать организацию',
		description: 'Для доступа к этому разделу, нужно выбрать или создать организацию.',
		buttonText: organizations.length > 0 ? 'Выбрать организацию' : 'Создать организацию'
	}

	const button =
		organizations.length > 0 ? (
			<Button className='w-full' href={urls.dashboard.organizations}>
				{needToChooseText.buttonText}
			</Button>
		) : (
			<OrganizationCreateForm>
				<Button className='w-full'>{needToChooseText.buttonText}</Button>
			</OrganizationCreateForm>
		)

	return (
		<div className='flex justify-center items-center h-full'>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle>{needToChooseText.title}</CardTitle>
					<CardDescription>{needToChooseText.description}</CardDescription>
				</CardHeader>
				<CardContent>{button}</CardContent>
			</Card>
		</div>
	)
})
