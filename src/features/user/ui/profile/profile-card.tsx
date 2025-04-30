import { observer } from 'mobx-react-lite'
import { userStore } from '@/entities/user'
import { SkeletonListUi } from '@/shared/ui'
import { PersonalAreas } from './personal-areas'
import { PersonalInfo } from './personal-info'

export const ProfileCard = observer(() => {
	const { user, loading } = userStore

	const renderProfile = () => {
		if (loading) return <SkeletonListUi length={2} />
		if (!user) return null
		return (
			<>
				<PersonalInfo user={user} />
				<PersonalAreas />
			</>
		)
	}

	return <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>{renderProfile()}</div>
})
