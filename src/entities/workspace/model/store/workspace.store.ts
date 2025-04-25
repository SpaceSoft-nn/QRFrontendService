import { makeAutoObservable, runInAction } from 'mobx'
import { authStore } from '@/features/auth'
import { apolloClient } from '@/shared/api/apollo'
import {
	AddPaymentWorkspaceInput,
	AddUserWorkspaceInput,
	Mutation,
	PaginatorInfo,
	Query,
	SetWorkUserWorkspaceInput,
	User,
	Workspace,
	WorkspaceCreateInput
} from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { formatDateTime } from '@/shared/lib/utils'
import {
	ADD_PAYMENT_METHOD_TO_WORKSPACE_MUTATION,
	ADD_USER_TO_WORKSPACE_MUTATION,
	CREATE_WORKSPACE_MUTATION,
	GET_WORKSPACE_MEMBERS_QUERY,
	GET_WORKSPACE_QUERY,
	GET_WORKSPACES_QUERY,
	REMOVE_USER_FROM_WORKSPACE_MUTATION,
	SET_WORK_USER_WORKSPACE_MUTATION
} from '../../gql'

class WorkspaceStore {
	workspaces: Workspace[] = []
	workspaceMembers: User[] = []
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

	changePage = async (page: number) => {
		if (this.loading || !this.pagination.totalPages) return
		await this.getWorkspaces(page)
	}

	getWorkspace = async (id: string) => {
		if (!id) return null

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'workspace'>>({
				query: GET_WORKSPACE_QUERY,
				variables: { id }
			})

			runInAction(() => {
				if (data.workspace) {
					const formattedWorkspace = {
						...data.workspace,
						created_at: formatDateTime(data.workspace.created_at)
					}

					const existingIndex = this.workspaces.findIndex(workspace => workspace.id === id)
					if (existingIndex !== -1) {
						this.workspaces[existingIndex] = formattedWorkspace
					} else {
						this.workspaces.push(formattedWorkspace)
					}

					return formattedWorkspace
				}
			})

			return null
		} catch (error) {
			console.error('[getWorkspace] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении АРМа'
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: this.error
			})
			return null
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getWorkspaces = async (page?: number, limit: number = 9) => {
		if (!authStore.isAuthenticated) return false

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query({
				query: GET_WORKSPACES_QUERY,
				variables: {
					page,
					count: limit
				}
			})

			runInAction(() => {
				this.workspaces = data.workspaces.data.map((workspace: Workspace) => ({
					...workspace,
					created_at: formatDateTime(workspace.created_at)
				}))
				this.pagination = data.workspaces.paginatorInfo
			})

			return true
		} catch (error) {
			console.error('[getWorkspaces] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при получении АРМов'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении АРМов'
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getWorkspaceMembers = async (workspaceId: string) => {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'workspace'>>({
				query: GET_WORKSPACE_MEMBERS_QUERY,
				variables: { workspaceId }
			})

			runInAction(() => {
				if (data.workspace) {
					this.workspaceMembers = data.workspace.users as User[]
				} else {
					this.workspaceMembers = []
				}
			})

			return true
		} catch (error) {
			console.error('[getWorkspaceMembers] error: ', error)
			runInAction(() => {
				this.error =
					error instanceof Error ? error.message : 'Произошла ошибка при получении пользователей АРМа'
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description: this.error
				})
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	createWorkspace = async (input: WorkspaceCreateInput) => {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'createWorkspace'>>({
				mutation: CREATE_WORKSPACE_MUTATION,
				variables: { input }
			})

			runInAction(() => {
				if (data?.createWorkspace) {
					this.workspaces.push({
						...data.createWorkspace,
						created_at: formatDateTime(data.createWorkspace.created_at)
					})
					this.pagination.total++
				}
			})

			return true
		} catch (error) {
			console.error('[createWorkspace] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при создании АРМа'
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	addUserToWorkspace = async (input: AddUserWorkspaceInput) => {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'addUserWorkspace'>>({
				mutation: ADD_USER_TO_WORKSPACE_MUTATION,
				variables: { input }
			})

			runInAction(() => {
				if (data?.addUserWorkspace) {
					this.workspaceMembers = [...this.workspaceMembers, data.addUserWorkspace]
					toast({
						title: 'Успешно',
						description: 'Пользователь успешно добавлен в АРМ'
					})
				}
			})

			return true
		} catch (error) {
			console.error('[addUserToWorkspace] error: ', error)
			runInAction(() => {
				this.error =
					error instanceof Error ? error.message : 'Произошла ошибка при добавлении пользователя в АРМ'
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description: this.error
				})
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	addWorkerToWorkspace = async (input: SetWorkUserWorkspaceInput) => {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'setWorkUserWorkspace'>>({
				mutation: SET_WORK_USER_WORKSPACE_MUTATION,
				variables: { input }
			})

			if (data?.setWorkUserWorkspace) {
				runInAction(() => {
					this.workspaces = this.workspaces.map(workspace => {
						if (workspace.id === input.workspace_id) {
							return {
								...workspace,
								user_worker: data.setWorkUserWorkspace
							}
						}
						return workspace
					})

					toast({
						title: 'Успешно',
						description: 'Пользователь успешно назначен на работу'
					})
				})
			}

			return true
		} catch (error) {
			console.error('[addWorkerToWorkspace] error: ', error)
			runInAction(() => {
				this.error =
					error instanceof Error ? error.message : 'Произошла ошибка при добавлении пользователя в АРМ'
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description: this.error
				})
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	removeUserFromWorkspace = async (input: AddUserWorkspaceInput) => {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'deleteUserWorkspace'>>({
				mutation: REMOVE_USER_FROM_WORKSPACE_MUTATION,
				variables: { input }
			})

			if (data?.deleteUserWorkspace) {
				runInAction(() => {
					toast({
						title: 'Успешно',
						description: 'Пользователь успешно удален из АРМа'
					})
				})
				await this.getWorkspaceMembers(input.workspace_id)
			}

			return true
		} catch (error) {
			console.error('[removeUserFromWorkspace] error: ', error)
			runInAction(() => {
				this.error =
					error instanceof Error ? error.message : 'Произошла ошибка при удалении пользователя из АРМа'
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description: this.error
				})
			})
			return false
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	addPaymentMethodToWorkspace = async (input: AddPaymentWorkspaceInput) => {
		try {
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'addPaymentWorkspace'>>({
				mutation: ADD_PAYMENT_METHOD_TO_WORKSPACE_MUTATION,
				variables: { input }
			})

			if (data?.addPaymentWorkspace) {
				runInAction(() => {
					this.workspaces = this.workspaces.map(workspace =>
						workspace.id === input.workspace_id
							? {
									...data.addPaymentWorkspace,
									created_at: formatDateTime(data.addPaymentWorkspace.created_at)
								}
							: workspace
					)
				})
			}
		} catch (error) {
			console.error('[addPaymentMethodToWorkspace] error: ', error)
			runInAction(() => {
				this.error =
					error instanceof Error ? error.message : 'Произошла ошибка при добавлении метода оплаты в АРМ'
				toast({
					title: 'Ошибка при добавлении метода оплаты в АРМ',
					variant: 'destructive',
					description: this.error
				})
			})
		}
	}
}

export const workspaceStore = new WorkspaceStore()
