import { makeAutoObservable } from 'mobx'
import { authStore } from '@/features/auth'
import { apolloClient } from '@/shared/api/apollo'
import { PaginatorInfo, Workspace, WorkspaceCreateInput } from '@/shared/api/graphql'
import { formatDateTime } from '@/shared/lib/utils'
import { CREATE_WORKSPACE_MUTATION, GET_WORKSPACES_QUERY } from '../../gql'

class WorkspaceStore {
	workspaces: Workspace[] = []
	pagination: PaginatorInfo = {
		limit: 6,
		total: 0,
		totalPages: 0,
		currentPage: 1
	}
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setLoading(loading: boolean) {
		this.loading = loading
	}

	setError(error: string | null) {
		this.error = error
	}

	setWorkspaces(workspaces: Workspace[]) {
		this.workspaces = workspaces
	}

	changePage = async (page: number) => {
		if (this.loading || !this.pagination.totalPages) return
		await this.getWorkspaces(page)
	}

	async getWorkspaces(page?: number, limit: number = 8) {
		if (!authStore.isAuthenticated) return false

		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.query({
				query: GET_WORKSPACES_QUERY,
				variables: {
					page,
					count: limit
				}
			})

			this.setWorkspaces(
				data.workspaces.data.map((workspace: Workspace) => ({
					...workspace,
					created_at: formatDateTime(workspace.created_at)
				}))
			)
			this.pagination = data.workspaces.paginatorInfo
			return true
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при получении АРМов')
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async createWorkspace(input: WorkspaceCreateInput) {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.mutate({
				mutation: CREATE_WORKSPACE_MUTATION,
				variables: { input }
			})

			this.workspaces.push(data.createWorkspace)
			return true
		} catch (error) {
			console.error('[createWorkspace] error: ', error)
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при создании АРМа')
			return false
		} finally {
			this.setLoading(false)
		}
	}
}

export const workspaceStore = new WorkspaceStore()
