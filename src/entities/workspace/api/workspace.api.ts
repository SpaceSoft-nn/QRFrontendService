// workspace.api.ts
import { BaseApi } from '@/shared/api/base-api'
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

class WorkspaceApi extends BaseApi {
	async getWorkspaces(count: number, page?: number) {
		const data = await this.query<Pick<Query, 'workspaces'>>({
			query: GET_WORKSPACES_QUERY,
			variables: { page, count }
		})

		return data?.workspaces
	}

	async getWorkspace(id: string) {
		const data = await this.query<Pick<Query, 'workspace'>>({
			query: GET_WORKSPACE_QUERY,
			variables: { id }
		})

		return data?.workspace
	}

	async getWorkspaceMembers(workspaceId: string) {
		const data = await this.query<Pick<Query, 'workspace'>>({
			query: GET_WORKSPACE_MEMBERS_QUERY,
			variables: { workspaceId }
		})

		return data?.workspace?.users as User[] | null
	}

	async createWorkspace(input: WorkspaceCreateInput) {
		const data = await this.mutate<Pick<Mutation, 'createWorkspace'>>({
			mutation: CREATE_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.createWorkspace
	}

	async addUserToWorkspace(input: AddUserWorkspaceInput) {
		const data = await this.mutate<Pick<Mutation, 'addUserWorkspace'>>({
			mutation: ADD_USER_TO_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.addUserWorkspace
	}

	async setWorkerInWorkspace(input: AddUserWorkspaceInput) {
		const data = await this.mutate<Pick<Mutation, 'setWorkUserWorkspace'>>({
			mutation: SET_WORK_USER_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.setWorkUserWorkspace
	}

	async removeUserFromWorkspace(input: AddUserWorkspaceInput) {
		const data = await this.mutate<Pick<Mutation, 'deleteUserWorkspace'>>({
			mutation: REMOVE_USER_FROM_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.deleteUserWorkspace
	}

	async addPaymentMethodToWorkspace(input: AddPaymentWorkspaceInput) {
		const data = await this.mutate<Pick<Mutation, 'addPaymentWorkspace'>>({
			mutation: ADD_PAYMENT_METHOD_TO_WORKSPACE_MUTATION,
			variables: { input }
		})

		return data?.addPaymentWorkspace
	}
}

export const workspaceApi = new WorkspaceApi()
