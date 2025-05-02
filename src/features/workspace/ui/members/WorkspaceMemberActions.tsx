import { BriefcaseBusinessIcon, EllipsisIcon, TrashIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { userStore } from '@/entities/user'
import { workspaceStore } from '@/entities/workspace'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/shared/ui'
import { User, UserRoleEnum } from '@/shared/api/graphql'

interface MemberActionsProps {
	member: User
	workspaceId: string
}

export const WorkspaceMemberActions = observer(({ member, workspaceId }: MemberActionsProps) => {
	const { user } = userStore

	const removeUserFromWorkspace = async () => {
		await workspaceStore.removeUserFromWorkspace({
			user_id: member.id,
			workspace_id: workspaceId
		})
	}

	const addWorkerToWorkspace = async () => {
		await workspaceStore.addWorkerToWorkspace({
			user_id: member.id,
			workspace_id: workspaceId
		})
	}

	if (user?.role === UserRoleEnum.Cassier || member.role === UserRoleEnum.Admin) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' icon={EllipsisIcon} />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem asChild>
					<Button
						variant='ghost'
						size='sm'
						className='font-normal'
						icon={BriefcaseBusinessIcon}
						onClick={() => addWorkerToWorkspace()}
					>
						Передать в работу
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						variant='ghost'
						className='w-full justify-start font-normal text-destructive hover:text-inherit hover:bg-destructive/40'
						size='sm'
						icon={TrashIcon}
						onClick={() => removeUserFromWorkspace()}
					>
						Удалить
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
})
