import { makeAutoObservable, runInAction } from 'mobx'
import { organizationStore } from '@/entities/organization'
import { DriverInfo, DriverInfoInput } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { integrationApi } from '../../api/integration.api'

class IntegrationStore {
	intergations: DriverInfo[] = []
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	getIntegrations = async () => {
		try {
			this.loading = true
			this.error = null

			const response = await integrationApi.getIntegrations()

			runInAction(() => {
				this.intergations = response
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

	getIntegation = async (id: string) => {
		try {
			this.loading = true
			this.error = null

			const response = await integrationApi.getIntegration(id)

			runInAction(() => {
				if (response) {
					this.intergations.push(response)
				}
			})
		} catch (error) {
			console.error('[getIntegation] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при получении интеграции'
			toast({
				title: 'Ошибка при получении интеграции',
				variant: 'destructive',
				description: this.error
			})
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	createIntergration = async (input: DriverInfoInput) => {
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

			const response = await integrationApi.createIntegration({
				...input,
				organization_id: activeOrganization.id
			})

			runInAction(() => {
				if (response) {
					this.intergations = [...this.intergations, response]
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
