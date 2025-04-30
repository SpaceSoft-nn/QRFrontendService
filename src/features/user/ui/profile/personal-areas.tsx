import { observer } from 'mobx-react-lite'
import { SubscriptionPlanBadge } from '@/entities/subscription'
import { formatFullName } from '@/entities/user'
import { userStore } from '@/entities/user'
import { Card, CardContent, CardHeader, CardTitle, DataItem } from '@/shared/ui'
import { PersonalArea } from '@/shared/api/graphql'
import { cn, formatCurrency, formatDateTime } from '@/shared/lib/utils'

interface PersonalAreaItemProps {
	ownerId?: string
	area: PersonalArea
}

const PersonalAreaItem = ({ ownerId, area }: PersonalAreaItemProps) => {
	const isCurrentArea = ownerId === area.id

	return (
		<Card className={cn({ 'border-primary/50': isCurrentArea })}>
			<CardHeader>
				<CardTitle className='flex items-center justify-between gap-2'>
					<span>{isCurrentArea ? 'Ваш кабинет' : 'Кабинет'}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-1'>
				{!isCurrentArea && (
					<DataItem
						orientation='horizontal'
						label='Администратор'
						data={formatFullName(area.owner, { initials: true })}
					/>
				)}
				<DataItem orientation='horizontal' label='Баланс' data={formatCurrency(area.balance)} />
				<DataItem
					orientation='horizontal'
					label='Подписка'
					data={<SubscriptionPlanBadge subscription={area.subscription.plan_name} />}
				/>

				{area.subscription.expires_at && (
					<DataItem
						orientation='horizontal'
						label='Следующее списание'
						data={formatDateTime(area.subscription.expires_at)}
					/>
				)}
			</CardContent>
		</Card>
	)
}

export const PersonalAreas = observer(() => {
	const { user, personalArea } = userStore

	if (user?.personalAreas.length === 0) return null

	return (
		<div className='flex flex-col gap-1'>
			{user &&
				user.personalAreas.length > 0 &&
				user.personalAreas.map(area => (
					<PersonalAreaItem key={area.id} ownerId={personalArea?.id} area={area} />
				))}
		</div>
	)
})
