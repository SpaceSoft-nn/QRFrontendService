import { CreateMemberForm, MembersList } from '@/features/members'
import { TitleUi } from '@/shared/ui'

export const MembersPage = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<TitleUi text='Пользователи' />
				<CreateMemberForm />
			</div>
			<MembersList />
		</div>
	)
}
