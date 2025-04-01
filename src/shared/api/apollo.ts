import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_GQL_URL
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		})
	}

	if (networkError) {
		console.error(`[Network error]: ${networkError}`)
	}
})

export const apolloClient = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
	connectToDevTools: true
})
