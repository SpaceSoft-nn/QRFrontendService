import { makeAutoObservable, runInAction } from 'mobx'
import {
	AddPaymentWorkspaceInput,
	AddUserWorkspaceInput,
	PaginatorInfo,
	SetWorkUserWorkspaceInput,
	User,
	Workspace,
	WorkspaceCreateInput
} from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { workspaceApi } from '../../api/workspace.api'

class WorkspaceStore {
	workspaces: Workspace[] = []
	workspaceMembers: User[] = []
	workspaceMaxMembers: number = 10
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
		try {
			this.loading = true
			this.error = null

			const response = await workspaceApi.getWorkspace(id)

			runInAction(() => {
				if (response) {
					const existingIndex = this.workspaces.findIndex(workspace => workspace.id === id)
					if (existingIndex !== -1) {
						this.workspaces[existingIndex] = response
					} else {
						this.workspaces.push(response)
					}
				}
			})
		} catch (error) {
			console.error('[getWorkspace] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении АРМа'
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: this.error
			})
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getWorkspaces = async (page?: number, count: number = 9) => {
		try {
			this.loading = true
			this.error = null

			const response = await workspaceApi.getWorkspaces(count, page)

			runInAction(() => {
				// типизация говна
				if (response.data) {
					this.workspaces = response.data as Workspace[]
				}
				this.pagination = response.paginatorInfo
			})
		} catch (error) {
			console.error('[getWorkspaces] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при получении АРМов'
			})
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении АРМов'
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	getWorkspaceMembers = async (id: string) => {
		try {
			this.loading = true
			this.error = null

			const response = await workspaceApi.getWorkspaceMembers(id)

			runInAction(() => {
				if (response) {
					this.workspaceMembers = response
				}
			})
		} catch (error) {
			console.error('[getWorkspaceMembers] error: ', error)
			runInAction(() => {
				this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении пользователей АРМ'
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description: this.error
				})
			})
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

			const response = await workspaceApi.createWorkspace(input)

			runInAction(() => {
				if (response) {
					this.workspaces.push(response)
					this.pagination.total++
				}
			})

			return true
		} catch (error) {
			console.error('[createWorkspace] error: ', error)
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при создании АРМ'
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

			const response = await workspaceApi.addUserToWorkspace(input)

			runInAction(() => {
				if (response) {
					this.workspaceMembers.push(response)

					this.workspaces = this.workspaces.map(workspace => {
						if (workspace.id === input.workspace_id) {
							return {
								...workspace,
								users: workspace.users ? [...workspace.users, response] : [response]
							}
						}
						return workspace
					})

					toast({
						title: 'Успешно',
						description: 'Пользователь добавлен в АРМ'
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

			const response = await workspaceApi.setWorkerInWorkspace(input)

			runInAction(() => {
				if (response) {
					this.workspaces = this.workspaces.map(workspace => {
						if (workspace.id === input.workspace_id) {
							return {
								...workspace,
								user_worker: response
							}
						}
						return workspace
					})

					toast({
						title: 'Успешно',
						description: 'Пользователь успешно назначен на работу'
					})
				}
			})

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

			const response = await workspaceApi.removeUserFromWorkspace(input)

			runInAction(() => {
				if (response) {
					this.workspaceMembers = this.workspaceMembers.filter(member => member.id !== input.user_id)

					this.workspaces = this.workspaces.map(workspace => {
						if (workspace.id === input.workspace_id && workspace.users) {
							return {
								...workspace,
								users: workspace.users.filter(user => (user?.id as string) !== input.user_id)
							}
						}
						return workspace
					})

					toast({
						title: 'Успешно',
						description: 'Пользователь успешно удален из АРМа'
					})
				}
			})

			return true
		} catch (error) {
			console.error('[removeUserFromWorkspace] error: ', error)
			runInAction(() => {
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description:
						error instanceof Error ? error.message : 'Произошла ошибка при удалении пользователя из АРМа'
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

			const response = await workspaceApi.addPaymentMethodToWorkspace(input)

			runInAction(() => {
				if (response) {
					this.workspaces = this.workspaces.map(workspace =>
						workspace.id === input.workspace_id ? response : workspace
					)
					toast({
						title: 'Успешно',
						description: 'Метод оплаты успешно добавлен в АРМ'
					})
				}
			})
		} catch (error) {
			console.error('[addPaymentMethodToWorkspace] error: ', error)
			runInAction(() => {
				this.error =
					error instanceof Error ? error.message : 'Произошла ошибка при добавлении метода оплаты в АРМ'
				toast({
					title: 'Ошибка',
					variant: 'destructive',
					description: this.error
				})
			})
		}
	}
}

export const workspaceStore = new WorkspaceStore()
