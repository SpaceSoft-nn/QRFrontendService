import { useEffect } from 'react'
import { UserPlusIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { OrganizationMemberSelector } from '@/features/organization'
import { userStore } from '@/entities/user'
import { workspaceStore } from '@/entities/workspace'
import { Button } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { DataTable } from '@/shared/ui/data-table'
import { UserRoleEnum } from '@/shared/api/graphql'
import { worksSpaceMembersColumns } from './members-list.columns'

interface WorkspaceMembersListProps {
	workspaceId: string
}

export const WorkSpaceMembersList = observer(({ workspaceId }: WorkspaceMembersListProps) => {
	const { workspaceMembers, loading, error } = workspaceStore
	const { user } = userStore

	useEffect(() => {
		workspaceStore.getWorkspaceMembers(workspaceId)
	}, [workspaceId])

	const handleAddUser = async (userId: string) => {
		await workspaceStore.addUserToWorkspace({
			user_id: userId,
			workspace_id: workspaceId
		})
	}

	return (
		<Card>
			<div className='flex items-center gap-2 justify-between'>
				<CardHeader>
					<CardTitle>Пользователи</CardTitle>
					<CardDescription>Пользователи, добавленные в данное рабочее место.</CardDescription>
				</CardHeader>
				<OrganizationMemberSelector
					placeholder='Добавить'
					trigger={
						<Button variant='secondary' size='sm' icon={UserPlusIcon}>
							Добавить
						</Button>
					}
					onValueChange={handleAddUser}
				/>
			</div>
			<CardContent>
				<DataTable
					columns={worksSpaceMembersColumns(workspaceId, user?.role === UserRoleEnum.Cassier)}
					data={workspaceMembers}
					loading={loading}
					error={error}
				/>
			</CardContent>
		</Card>
	)
})
