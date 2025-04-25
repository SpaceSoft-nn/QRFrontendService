import { Card, CardContent, CardDescription, CardHeader, CardTitle, DataItem } from '@/shared/ui'
import { User } from '@/shared/api/graphql'

interface PersonalInfoProps {
	user: User
}

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Ваши данные</CardTitle>
				<CardDescription>Управление личными данными</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-2'>
				<DataItem label='Имя' data={user.first_name} />
				<DataItem label='Фамилия' data={user.last_name} />
				<DataItem label='Отчество' data={user.father_name} />
				{user.email && <DataItem label='Email' data={user.email} />}
				{user.phone && <DataItem label='Телефон' data={user.phone} />}
			</CardContent>
		</Card>
	)
}
