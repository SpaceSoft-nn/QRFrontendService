import { apolloClient } from '@/shared/api/apollo'
import { Mutation, UserLoginInput, UserRegistration } from '@/shared/api/graphql'
import { LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_MUTATION, REGISTER_MUTATION } from './gql'

export const authApi = {
	login: async (input: UserLoginInput) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'login'>>({
			mutation: LOGIN_MUTATION,
			variables: { input }
		})

		return data?.login.access_token
	},

	register: async (input: UserRegistration) => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'registration'>>({
			mutation: REGISTER_MUTATION,
			variables: { input }
		})

		return data?.registration.access_token
	},

	logout: async () => {
		await apolloClient.mutate({
			mutation: LOGOUT_MUTATION
		})
	},

	refreshToken: async () => {
		const { data } = await apolloClient.mutate<Pick<Mutation, 'authRefresh'>>({
			mutation: REFRESH_MUTATION
		})

		return data?.authRefresh.access_token
	}
}
