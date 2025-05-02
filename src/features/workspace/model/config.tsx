import { BanknoteIcon, Building2Icon, CreditCardIcon, User, UsersIcon } from 'lucide-react'
import { formatOrganizationWithOpf } from '@/entities/organization'
import { PaymentMethodSelector } from '@/entities/payment-method'
import { formatFullName } from '@/entities/user'
import { workspaceStore } from '@/entities/workspace'
import { Workspace } from '@/shared/api/graphql'
import { urls } from '@/shared/config'

export const getWorkspaceCardData = (workspace: Workspace) => [
	{
		label: 'Организация',
		data: formatOrganizationWithOpf(workspace.organization).nameWithOpf,
		icon: Building2Icon,
		link: urls.dashboard.organizationById(workspace.organization.id)
	},
	{
		label: 'Метод оплаты',
		data: workspace.paymentMethod?.driver_name ?? (
			<PaymentMethodSelector
				size='xs'
				variant='secondary'
				onValueChange={paymentId =>
					workspaceStore.addPaymentMethodToWorkspace({
						workspace_id: workspace.id,
						payment_method_id: paymentId
					})
				}
			/>
		),
		icon: BanknoteIcon
	},
	{
		label: 'Занимает',
		data: workspace.user_worker ? formatFullName(workspace.user_worker) : 'Никто',
		icon: User
	},
	{
		label: 'Пользователей',
		data: `${workspace.users?.length}`,
		icon: UsersIcon
	}
]

export const getWorkspaceItemData = (workspace: Workspace) => [
	{
		label: 'Организация',
		data: formatOrganizationWithOpf(workspace.organization).nameWithOpf,
		icon: Building2Icon
	},
	{
		label: 'Занимает',
		data: workspace.user_worker ? formatFullName(workspace.user_worker) : 'Никто',
		icon: User
	},
	{
		label: 'Метод платы',
		data: workspace.paymentMethod ? `${workspace.paymentMethod.driver_name}` : '-',
		icon: CreditCardIcon
	}
]
