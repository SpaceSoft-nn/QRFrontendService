import { gql } from '@apollo/client'
import { USER_BASE_FRAGMENT, WORKSPACE_FRAGMENT, WORKSPACE_PAGINATED_FRAGMENT } from '@/shared/api/fragments'

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

export const ADD_USER_TO_WORKSPACE_MUTATION = gql`
	mutation AddUserToWorkspace($input: AddUserWorkspaceInput!) {
		addUserWorkspace(input: $input) {
			...UserBaseFragment
		}
	}
	${USER_BASE_FRAGMENT}
`

export const GET_WORKSPACE_MEMBERS_QUERY = gql`
	query GetWorkspaceMembers($workspaceId: ID!) {
		workspace(id: $workspaceId) {
			users {
				...UserBaseFragment
			}
		}
	}
	${USER_BASE_FRAGMENT}
`

export const REMOVE_USER_FROM_WORKSPACE_MUTATION = gql`
	mutation RemoveUserFromWorkspace($input: DeleteUserWorkspaceInput!) {
		deleteUserWorkspace(input: $input) {
			status
		}
	}
`

export const SET_WORK_USER_WORKSPACE_MUTATION = gql`
	mutation SetWorkUserWorkspace($input: SetWorkUserWorkspaceInput!) {
		setWorkUserWorkspace(input: $input) {
			...UserBaseFragment
		}
	}
	${USER_BASE_FRAGMENT}
`

export const ADD_PAYMENT_METHOD_TO_WORKSPACE_MUTATION = gql`
	mutation AddPaymentMethodToWorkspace($input: AddPaymentWorkspaceInput!) {
		addPaymentWorkspace(input: $input) {
			...WorkspaceFragment
		}
	}
	${WORKSPACE_FRAGMENT}
`
