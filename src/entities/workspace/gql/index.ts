import { gql } from '@apollo/client'
import { WORKSPACE_FRAGMENT, WORKSPACE_PAGINATED_FRAGMENT } from '@/shared/api/fragments'

export const GET_WORKSPACES_QUERY = gql`
	query GetWorkspaces($page: Int, $count: Int) {
		workspaces(page: $page, count: $count) {
			...WorkspacePaginatedFragment
		}
	}
	${WORKSPACE_PAGINATED_FRAGMENT}
`

export const GET_WORKSPACE_QUERY = gql`
	query GetWorkspace($id: ID!) {
		workspace(id: $id) {
			...WorkspaceFragment
		}
	}
	${WORKSPACE_FRAGMENT}
`

export const CREATE_WORKSPACE_MUTATION = gql`
	mutation CreateWorkspace($input: WorkspaceCreateInput!) {
		createWorkspace(input: $input) {
			...WorkspaceFragment
		}
	}
	${WORKSPACE_FRAGMENT}
`
