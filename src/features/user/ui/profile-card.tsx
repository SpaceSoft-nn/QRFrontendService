import React from 'react'
import { observer } from 'mobx-react-lite'
import { userStore } from '@/entities/user'
import { DataItem, Skeleton } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

const ProfileFormSkeleton = () => {
	return <Skeleton className='h-96 w-full' />
}

export const ProfileCard: React.FC = observer(() => {
	const { user, loading } = userStore

	if (loading) return <ProfileFormSkeleton />
	if (!user) return null

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
})
