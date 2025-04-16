import { makeAutoObservable } from 'mobx'
import { apolloClient } from '@/shared/api/apollo'
import { Workspace } from '@/shared/api/graphql'
import { GET_WORKSPACES_QUERY } from '../../gql'

class WorkspaceStore {
	workspaces: Workspace[] = []
	loading: boolean = false
	error: string | null = null

	setLoading(loading: boolean) {
		this.loading = loading
	}

	setError(error: string | null) {
		this.error = error
	}

	constructor() {
		makeAutoObservable(this)
		this.getWorkspaces()
	}

	async getWorkspaces() {
		try {
			this.setLoading(true)
			this.setError(null)

			const { data } = await apolloClient.query({
				query: GET_WORKSPACES_QUERY
			})

			this.workspaces = data.workspaces

			return true
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Произошла ошибка при получении АРМов')
			return false
		} finally {
			this.setLoading(false)
		}
	}
}

export const workspaceStore = new WorkspaceStore()
