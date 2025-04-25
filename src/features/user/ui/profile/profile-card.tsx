import { observer } from 'mobx-react-lite'
import { userStore } from '@/entities/user'
import { Skeleton } from '@/shared/ui'
import { PersonalAreas } from './personal-areas'
import { PersonalInfo } from './personal-info'

const ProfileFormSkeleton = () => {
	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
			<Skeleton className='h-40 w-full' />
			<Skeleton className='h-40 w-full' />
		</div>
	)
}

export const ProfileCard = observer(() => {
	const { user, loading } = userStore

	if (loading) return <ProfileFormSkeleton />
	if (!user) return null

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
			<PersonalInfo user={user} />
			<PersonalAreas />
		</div>
	)
})
