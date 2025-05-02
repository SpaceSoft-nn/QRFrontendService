import { MutationOptions, QueryOptions } from '@apollo/client'
import { apolloClient } from '@/shared/api'

export class BaseApi {
	protected async query<T>(options: QueryOptions): Promise<T> {
		const { data } = await apolloClient.query<T>(options)
		return data
	}

	protected async mutate<T>(options: MutationOptions): Promise<T> {
		const { data } = await apolloClient.mutate<T>(options)
		return data as T
	}
}
