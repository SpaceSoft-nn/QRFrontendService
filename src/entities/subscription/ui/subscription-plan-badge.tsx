import { Badge } from '@/shared/ui'
import { SubscriptionPlan } from '@/shared/api/graphql'
import { cn } from '@/shared/lib'
import { subscriptionPlanColors, subscriptionPlanNames, SubscriptionPlans } from '../model/subscription.types'

interface SubscriptionPlanBadgeProps {
	subscription: SubscriptionPlan['plan_name']
}

export const SubscriptionPlanBadge = ({ subscription }: SubscriptionPlanBadgeProps) => {
	return (
		<Badge
			variant='outline'
			className={cn('text-white font-montserrat', subscriptionPlanColors[subscription as SubscriptionPlans])}
		>
			{subscriptionPlanNames[subscription as SubscriptionPlans] || 'Нет подписки'}
		</Badge>
	)
}
