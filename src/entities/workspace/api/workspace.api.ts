import { apolloClient } from '@/shared/api'
import {
	AddPaymentWorkspaceInput,
	AddUserWorkspaceInput,
	Mutation,
	Query,
	User,
	WorkspaceCreateInput
} from '@/shared/api/graphql'
import {
	ADD_PAYMENT_METHOD_TO_WORKSPACE_MUTATION,
	ADD_USER_TO_WORKSPACE_MUTATION,
	CREATE_WORKSPACE_MUTATION,
	GET_WORKSPACE_MEMBERS_QUERY,
	GET_WORKSPACE_QUERY,
	GET_WORKSPACES_QUERY,
	REMOVE_USER_FROM_WORKSPACE_MUTATION,
	SET_WORK_USER_WORKSPACE_MUTATION
} from './gql'

export const workspaceApi = {
	getWorkspaces: async (count: number, page?: number) => {
		const { data } = await apolloClient.query<Pick<Query, 'workspaces'>>({
			query: GET_WORKSPACES_QUERY,
			variables: { page, count }
		})

		return data?.workspaces
	},

	getWorkspace: async (id: string) => {
		const { data } = await apolloClient.query<Pick<Query, 'workspace'>>({
			query: GET_WORKSPACE_QUERY,
			variables: { id }
		})

		return data?.workspace
	},

	getWorkspaceMembers: async (workspaceId: string) => {
		const { data } = await apolloClient.query<Pick<Query, 'workspace'>>({
			query: GET_WORKSPACE_MEMBERS_QUERY,
			variables: { workspaceId }
		})

		return data?.workspace?.users as User[] | null
	},

	createWorkspace: async (input: WorkspaceCreateInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'createWorkspace'>>({
			mutation: CREATE_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.createWorkspace
	},

	addUserToWorkspace: async (input: AddUserWorkspaceInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'addUserWorkspace'>>({
			mutation: ADD_USER_TO_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.addUserWorkspace
	},

	setWorkerInWorkspace: async (input: AddUserWorkspaceInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'setWorkUserWorkspace'>>({
			mutation: SET_WORK_USER_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.setWorkUserWorkspace
	},

	removeUserFromWorkspace: async (input: AddUserWorkspaceInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'deleteUserWorkspace'>>({
			mutation: REMOVE_USER_FROM_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.deleteUserWorkspace
	},

	addPaymentMethodToWorkspace: async (input: AddPaymentWorkspaceInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'addPaymentWorkspace'>>({
			mutation: ADD_PAYMENT_METHOD_TO_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.addPaymentWorkspace
	}
}
