import { observer } from 'mobx-react-lite'
import { organizationStore } from '@/entities/organization'
import { userStore } from '@/entities/user'
import { CommandUi } from '@/shared/ui'
import { CommandUiProps } from '@/shared/ui/CommandUi/CommandUi'
import { UserRoleEnum } from '@/shared/api/graphql'
import { CreateOrganizationMemberForm } from '../create/create-member-form'

interface OrganizationMemberSelectorProps
	extends Pick<CommandUiProps, 'onValueChange' | 'size' | 'variant' | 'placeholder' | 'trigger' | 'align'> {}

export const OrganizationMemberSelector = observer<OrganizationMemberSelectorProps>(
	({ onValueChange, placeholder, ...props }) => {
		const { membersOptions, loading, error } = organizationStore
		const { user } = userStore

		if (user?.role === UserRoleEnum.Cassier) return null

		return (
			<CommandUi
				items={membersOptions()}
				placeholder={placeholder}
				actions={<CreateOrganizationMemberForm className='w-full' size='sm' />}
				fetchError={error}
				loading={loading}
				onOpen={() => organizationStore.getOrganizationMembers()}
				onValueChange={onValueChange}
				{...props}
			/>
		)
	}
)
