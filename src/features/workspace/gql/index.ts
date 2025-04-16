import { gql } from '@apollo/client'
import { WORKSPACE_FRAGMENT } from '@/shared/api/fragments'

export const GET_WORKSPACES_QUERY = gql`
	query GetWorkspaces {
		workspaces {
			...WorkspaceFragment
		}
	}
	${WORKSPACE_FRAGMENT}
`
