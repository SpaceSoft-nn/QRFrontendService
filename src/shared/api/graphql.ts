import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
}

export type AuthToken = {
	__typename?: 'AuthToken'
	/** Токен JWT */
	access_token?: Maybe<Scalars['String']['output']>
	/** Время сущестования Access токена в минутах */
	expires_in_access?: Maybe<Scalars['String']['output']>
	/** Время сущестования Refresh токена в минутах */
	expires_in_refresh?: Maybe<Scalars['String']['output']>
	/** Тип токена */
	token_type?: Maybe<Scalars['String']['output']>
}

export type Mutation = {
	__typename?: 'Mutation'
	/** Входим под user - возвращаем JWT токен */
	authLogin: AuthToken
	/** Выходим из авторизации - токены инвалидируются */
	authLogout: Scalars['String']['output']
	/** Обновляем токены - access/refresh */
	authRefresh: AuthToken
	/** Устанавливаем полезную нагрузку, получаем новый access токен */
	authSetPayload: AuthToken
}

export type MutationAuthLoginArgs = {
	input: UserLogin
}

export type MutationAuthSetPayloadArgs = {
	organization_id: Scalars['ID']['input']
}

/** Allows ordering a list of records. */
export type OrderByClause = {
	/** The column that is used for ordering. */
	column: Scalars['String']['input']
	/** The direction that is used for ordering. */
	order: SortOrder
}

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
	/** Amount of items. */
	Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
	/** Average. */
	Avg = 'AVG',
	/** Amount of items. */
	Count = 'COUNT',
	/** Maximum. */
	Max = 'MAX',
	/** Minimum. */
	Min = 'MIN',
	/** Sum. */
	Sum = 'SUM'
}

export type Query = {
	__typename?: 'Query'
	/** Получаем модель User */
	authMe?: Maybe<User>
	userById?: Maybe<User>
}

export type QueryUserByIdArgs = {
	id: Scalars['ID']['input']
}

/** Directions for ordering a list of records. */
export enum SortOrder {
	/** Sort records in ascending order. */
	Asc = 'ASC',
	/** Sort records in descending order. */
	Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
	/** Only return trashed results. */
	Only = 'ONLY',
	/** Return both trashed and non-trashed results. */
	With = 'WITH',
	/** Only return non-trashed results. */
	Without = 'WITHOUT'
}

export type User = {
	__typename?: 'User'
	email?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	phone?: Maybe<Scalars['String']['output']>
}

export type UserLogin = {
	email: Scalars['String']['input']
	password: Scalars['String']['input']
	phone?: InputMaybe<Scalars['String']['input']>
}

export type LoginMutationVariables = Exact<{
	input: UserLogin
}>

export type LoginMutation = {
	__typename?: 'Mutation'
	authLogin: {
		__typename?: 'AuthToken'
		access_token?: string | null
		token_type?: string | null
		expires_in_access?: string | null
		expires_in_refresh?: string | null
	}
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrentUserQuery = {
	__typename?: 'Query'
	authMe?: { __typename?: 'User'; id: string; email?: string | null; phone?: string | null } | null
}

export type AuthLogoutMutationVariables = Exact<{ [key: string]: never }>

export type AuthLogoutMutation = { __typename?: 'Mutation'; authLogout: string }

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; authLogout: string }

export const LoginDocument = gql`
	mutation Login($input: UserLogin!) {
		authLogin(input: $input) {
			access_token
			token_type
			expires_in_access
			expires_in_refresh
		}
	}
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const GetCurrentUserDocument = gql`
	query GetCurrentUser {
		authMe {
			id
			email
			phone
		}
	}
`

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
	baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options)
}
export function useGetCurrentUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options)
}
export function useGetCurrentUserSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options)
}
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>
export const AuthLogoutDocument = gql`
	mutation AuthLogout {
		authLogout
	}
`
export type AuthLogoutMutationFn = Apollo.MutationFunction<AuthLogoutMutation, AuthLogoutMutationVariables>

/**
 * __useAuthLogoutMutation__
 *
 * To run a mutation, you first call `useAuthLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authLogoutMutation, { data, loading, error }] = useAuthLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthLogoutMutation(
	baseOptions?: Apollo.MutationHookOptions<AuthLogoutMutation, AuthLogoutMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<AuthLogoutMutation, AuthLogoutMutationVariables>(AuthLogoutDocument, options)
}
export type AuthLogoutMutationHookResult = ReturnType<typeof useAuthLogoutMutation>
export type AuthLogoutMutationResult = Apollo.MutationResult<AuthLogoutMutation>
export type AuthLogoutMutationOptions = Apollo.BaseMutationOptions<AuthLogoutMutation, AuthLogoutMutationVariables>
export const LogoutDocument = gql`
	mutation Logout {
		authLogout
	}
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>
