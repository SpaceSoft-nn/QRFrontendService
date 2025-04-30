import { Card, CardContent, CardDescription, CardHeader, CardTitle, DataGroup } from '@/shared/ui'
import { User } from '@/shared/api/graphql'

interface PersonalInfoProps {
	user: User
}

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
	const profileData = [
		{
			label: 'Имя',
			data: user.first_name
		},
		{
			label: 'Фамилия',
			data: user.last_name
		},
		{
			label: 'Отчество',
			data: user.father_name
		},
		{
			hide: !user.email,
			label: 'Email',
			data: user.email
		},
		{
			hide: !user.phone,
			label: 'Телефон',
			data: user.phone
		}
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>Ваши данные</CardTitle>
				<CardDescription>Управление личными данными</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-2'>
				<DataGroup data={profileData} />
			</CardContent>
		</Card>
	)
}
