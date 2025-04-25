import { makeAutoObservable, runInAction } from 'mobx'
import { organizationStore } from '@/entities/organization'
import { apolloClient } from '@/shared/api'
import { DriverInfo, DriverInfoInput, Mutation, Query } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { CREATE_INTEGRATION_MUTATION, GET_INTEGRATION_QUERY, GET_INTEGRATIONS_QUERY } from '../../gql'

class IntegrationStore {
	intergations: DriverInfo[] = []
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async getIntegrations() {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'driverInfosByUser'>>({
				query: GET_INTEGRATIONS_QUERY
			})

			runInAction(() => {
				this.intergations = data?.driverInfosByUser.filter(integration => integration !== null) || []
			})
		} catch (error) {
			console.error('[getIntegrations] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении интеграций'
			toast({
				title: 'Ошибка при получении интеграций',
				variant: 'destructive',
				description: this.error
			})
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	async getIntegation(id: string) {
		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.query<Pick<Query, 'driverInfoById'>>({
				query: GET_INTEGRATION_QUERY,
				variables: { id }
			})

			runInAction(() => {
				if (data?.driverInfoById) {
					this.intergations = [...this.intergations, data.driverInfoById]
				}
			})
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении интеграции'
			toast({
				title: 'Ошибка при получении интеграции',
				variant: 'destructive',
				description: this.error
			})
			console.error('[getIntegation] error: ', error)
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	async createIntergration(input: DriverInfoInput) {
		const { activeOrganization } = organizationStore

		if (!activeOrganization) {
			toast({
				title: 'Ошибка при создании интеграции',
				variant: 'destructive',
				description: 'Не выбрана организация'
			})
			return
		}

		try {
			this.loading = true
			this.error = null

			const { data } = await apolloClient.mutate<Pick<Mutation, 'createDriverInfo'>>({
				mutation: CREATE_INTEGRATION_MUTATION,
				variables: { input: { ...input, organization_id: activeOrganization.id } }
			})

			runInAction(() => {
				if (data?.createDriverInfo) {
					this.intergations = [...this.intergations, data.createDriverInfo]
				}
			})
		} catch (error) {
			console.error('[createIntergration] error: ', error)
			toast({
				title: 'Ошибка при создании интеграции',
				variant: 'destructive',
				description: error instanceof Error ? error.message : 'Произошла ошибка при создании интеграции'
			})
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const integrationStore = new IntegrationStore()
