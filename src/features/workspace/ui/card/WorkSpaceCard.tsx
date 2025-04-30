import { BanknoteIcon, Building2Icon, User, UsersIcon } from 'lucide-react'
import { formatOrganizationWithOpf } from '@/entities/organization'
import { PaymentMethodSelector } from '@/entities/payment-method'
import { formatFullName } from '@/entities/user'
import { workspaceStore } from '@/entities/workspace'
import { DataGroup } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Workspace } from '@/shared/api/graphql'
import { WorkSpaceBadgeStatus } from '../badge/WorkSpaceBadgeStatus'
import { urls } from '@/shared/config'

export const WorkSpaceCard = ({ workspace }: { workspace: Workspace }) => {
	const workspaceData = [
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
					onValueChange={value => {
						workspaceStore.addPaymentMethodToWorkspace({
							workspace_id: workspace.id,
							payment_method_id: value
						})
					}}
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
			data: workspace.users?.length,
			icon: UsersIcon
		}
	]

	return (
		<Card className='flex-1'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between gap-2'>
					<span>{workspace.name}</span>
					<WorkSpaceBadgeStatus status={workspace.is_active} />
				</CardTitle>
				<CardDescription className='text-xs'>от {workspace.created_at}</CardDescription>
			</CardHeader>
			<CardContent>
				<DataGroup data={workspaceData} />
			</CardContent>
		</Card>
	)
}
