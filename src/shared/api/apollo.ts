import { ApolloClient, createHttpLink, from, InMemoryCache, Operation } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { authStore } from '@/features/auth'
import { urls } from '@/shared/config'

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_GQL_URL,
	credentials: 'include',
	fetchOptions: {
		timeout: 30000
	}
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const handleUnauthenticated = async (operation: Operation) => {
	try {
		const success = await authStore.refreshToken()
		if (!success) {
			authStore.logout()
			window.location.href = urls.auth.login
		}
	} catch (error) {
		console.error(error)
		authStore.logout()
		window.location.href = urls.auth.login
	}
}

const handleGraphQLError = (error: any) => {
	console.error(`[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`)
}

const handleNetworkError = (error: any) => {
	console.error(`[Network error]: ${error}`)
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		for (const err of graphQLErrors) {
			if (err.message.includes('Unauthenticated')) {
				handleUnauthenticated(operation)
				return
			}
			handleGraphQLError(err)
		}
	}

	if (networkError) {
		handleNetworkError(networkError)
	}

	return forward(operation)
})

export const apolloClient = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
	connectToDevTools: true
})
