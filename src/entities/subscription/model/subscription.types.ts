export enum SubscriptionPlans {
	BASIC = 'basic',
	PRO = 'pro',
	ENTERPRISE = 'enterprise'
}

export const subscriptionPlanColors: Record<SubscriptionPlans, string> = {
	[SubscriptionPlans.BASIC]: 'bg-gradient-to-br from-neutral-300 to-neutral-500',
	[SubscriptionPlans.PRO]: 'bg-gradient-to-br from-primary to-primary/70',
	[SubscriptionPlans.ENTERPRISE]: 'bg-gradient-to-br from-red-300 to-red-500'
}

export const subscriptionPlanNames: Record<SubscriptionPlans, string> = {
	[SubscriptionPlans.BASIC]: 'Basic',
	[SubscriptionPlans.PRO]: 'Pro',
	[SubscriptionPlans.ENTERPRISE]: 'Enterprise'
}
