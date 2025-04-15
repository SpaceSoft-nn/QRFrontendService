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
	Date: { input: any; output: any }
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

export type BalanceLog = {
	__typename?: 'BalanceLog'
	amount: Scalars['Float']['output']
	balance_after: Scalars['Float']['output']
	balance_before: Scalars['Float']['output']
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	operation?: Maybe<Scalars['String']['output']>
	personal_area: PersonalArea
	updated_at: Scalars['Date']['output']
}

export type DriverInfo = {
	__typename?: 'DriverInfo'
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	/** Название ключа например API Key или Seecret Key */
	key: Scalars['String']['output']
	/** К какой организации относится этот пользователь */
	organizaion: Organization
	payment_method?: Maybe<PaymentMethod>
	updated_at: Scalars['Date']['output']
	/** Пользователь который указал значение */
	user: Scalars['String']['output']
	/** Значение ключа */
	value: Scalars['String']['output']
}

export type EmailList = {
	__typename?: 'EmailList'
	/** Активирован ли email */
	status: Scalars['Boolean']['output']
	/** Значение email */
	value: Scalars['String']['output']
}

export type Mutation = {
	__typename?: 'Mutation'
	/** Выходим из авторизации - токены инвалидируются */
	authLogout: Scalars['String']['output']
	/** Обновляем токены - access/refresh */
	authRefresh: AuthToken
	/** Устанавливаем полезную нагрузку, получаем новый access токен */
	authSetPayload: AuthToken
	/** Создание организации по авторизированному пользователю */
	createOrganization: Organization
	/** Создание организации по авторизированному пользователю */
	createWorkspace: Workspace
	login: AuthToken
	/** Регистрация пользователя */
	registration: AuthToken
	/** Создание пользователя cassier/manager */
	userCreate: User
}

export type MutationAuthSetPayloadArgs = {
	organization_id: Scalars['ID']['input']
}

export type MutationCreateOrganizationArgs = {
	input: OrganizationCreate
}

export type MutationCreateWorkspaceArgs = {
	input: WorkspaceCreate
}

export type MutationLoginArgs = {
	input: UserLogin
}

export type MutationRegistrationArgs = {
	input: UserRegistration
}

export type MutationUserCreateArgs = {
	input: UserCreate
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

export type Organization = {
	__typename?: 'Organization'
	address: Scalars['String']['output']
	created_at: Scalars['Date']['output']
	description?: Maybe<Scalars['String']['output']>
	email?: Maybe<Scalars['String']['output']>
	/** Дата основания компании */
	founded_date?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	/** Инн у ООО/ИП */
	inn: Scalars['String']['output']
	/** КПП - Только у организации */
	kpp?: Maybe<Scalars['String']['output']>
	name: Scalars['String']['output']
	/** Вид экономической деятельности */
	okved?: Maybe<Scalars['String']['output']>
	/** Основатель компании User */
	owner: User
	phone?: Maybe<Scalars['String']['output']>
	/** ОГРН и ОГРНИП */
	registration_number: Scalars['String']['output']
	/** Статус Закрыт/Открыт */
	remuved: Scalars['String']['output']
	/** Тип оргиназции: ООО, ИП и т.д */
	type: OrganizationTypeEnum
	updated_at: Scalars['Date']['output']
	/** Все user принадлежащей компании */
	users: Array<User>
	website?: Maybe<Scalars['String']['output']>
}

export type OrganizationCreate = {
	address: Scalars['String']['input']
	description?: InputMaybe<Scalars['String']['input']>
	email?: InputMaybe<Scalars['String']['input']>
	founded_date?: InputMaybe<Scalars['String']['input']>
	/** Инн */
	inn: Scalars['String']['input']
	/** КПП - Только у организации */
	kpp?: InputMaybe<Scalars['String']['input']>
	name: Scalars['String']['input']
	/** Вид экономической деятельности */
	okved?: InputMaybe<Scalars['String']['input']>
	phone?: InputMaybe<Scalars['String']['input']>
	/** ОГРН и ОГРНИП */
	registration_number: Scalars['String']['input']
	type: OrganizationTypeEnum
	website?: InputMaybe<Scalars['String']['input']>
}

export enum OrganizationTypeEnum {
	Individual = 'individual',
	Legal = 'legal'
}

export type Payment = {
	__typename?: 'Payment'
	created_at: Scalars['Date']['output']
	driver?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	name: Scalars['String']['output']
	number_uuid: Scalars['String']['output']
	status: Scalars['Boolean']['output']
	updated_at: Scalars['Date']['output']
}

export type PaymentMethod = {
	__typename?: 'PaymentMethod'
	active: Scalars['Boolean']['output']
	created_at: Scalars['Date']['output']
	driver: Scalars['String']['output']
	driver_infos?: Maybe<DriverInfo>
	id: Scalars['ID']['output']
	name: Scalars['String']['output']
	payment?: Maybe<Payment>
	updated_at: Scalars['Date']['output']
}

export type PersonalArea = {
	__typename?: 'PersonalArea'
	balance: Scalars['Float']['output']
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	owner: User
	subscription: SubscriptionPlan
	updated_at: Scalars['Date']['output']
}

export type PhoneList = {
	__typename?: 'PhoneList'
	/** Активирован ли сотовый */
	status: Scalars['Boolean']['output']
	/** Значение сотового */
	value: Scalars['String']['output']
}

export type QrCode = {
	__typename?: 'QrCode'
	amount?: Maybe<Scalars['String']['output']>
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	name_product?: Maybe<Scalars['String']['output']>
	qr_url: Scalars['String']['output']
	updated_at: Scalars['Date']['output']
}

export type Query = {
	__typename?: 'Query'
	/** Получаем модель User */
	authMe?: Maybe<User>
	organization?: Maybe<Organization>
	organizations: Array<Maybe<Organization>>
	userById?: Maybe<User>
	workspace?: Maybe<Workspace>
	workspaces: Array<Maybe<Workspace>>
}

export type QueryOrganizationArgs = {
	id: Scalars['ID']['input']
}

export type QueryUserByIdArgs = {
	id: Scalars['ID']['input']
}

export type QueryWorkspaceArgs = {
	id: Scalars['ID']['input']
}

/** Directions for ordering a list of records. */
export enum SortOrder {
	/** Sort records in ascending order. */
	Asc = 'ASC',
	/** Sort records in descending order. */
	Desc = 'DESC'
}

export type SubscriptionPlan = {
	__typename?: 'SubscriptionPlan'
	created_at: Scalars['Date']['output']
	expires_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	plan_name: Scalars['String']['output']
	price: Scalars['Int']['output']
	updated_at: Scalars['Date']['output']
}

export type Transaction = {
	__typename?: 'Transaction'
	amount: Scalars['Float']['output']
	count_product: Scalars['String']['output']
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	name_product: Scalars['String']['output']
	nubmer_uuid: Scalars['String']['output']
	qr_code: QrCode
	status?: Maybe<TransactionStatusEnum>
	type_product: Scalars['String']['output']
	updated_at: Scalars['Date']['output']
	workspace: Workspace
}

export enum TransactionStatusEnum {
	Cancelled = 'cancelled',
	Completed = 'completed',
	Pending = 'pending',
	WaitingForCapture = 'waiting_for_capture'
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
	/** Активирован ли user */
	active: Scalars['Boolean']['output']
	/** Прошёл ли user нотификацию */
	auth: Scalars['Boolean']['output']
	created_at: Scalars['Date']['output']
	/** Значение email */
	email?: Maybe<Scalars['String']['output']>
	/** Таблица на email_list где указано значение email и статус нотификации */
	emailList?: Maybe<EmailList>
	father_name?: Maybe<Scalars['String']['output']>
	first_name?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	last_name?: Maybe<Scalars['String']['output']>
	/** Вернуть все организации к которым принадлежит пользователь */
	organizations?: Maybe<Array<Maybe<Organization>>>
	/** Права user, возможно фронту это не надо */
	permission: Scalars['Int']['output']
	/** Вернуть все личные кабинеты к которым принадлежит пользователь */
	personalAreas: Array<PersonalArea>
	/** Значение phone */
	phone?: Maybe<Scalars['String']['output']>
	/** Таблица на email_list где указано значение phone и статус нотификации */
	phoneList?: Maybe<PhoneList>
	role: UserRoleEnum
	updated_at: Scalars['Date']['output']
}

export type UserCreate = {
	agreement: Scalars['Boolean']['input']
	/** В запросе должен быть обязательно либо email, либо phone */
	email: Scalars['String']['input']
	/** Отчество */
	father_name: Scalars['String']['input']
	/** Имя */
	first_name: Scalars['String']['input']
	/** Фамилия */
	last_name: Scalars['String']['input']
	/** ID организации, куда будет добавлен пользователь */
	organization_id: Scalars['ID']['input']
	/** Обязательный параметр пароля */
	password: Scalars['String']['input']
	/** Повтор пароля */
	password_confirmation: Scalars['String']['input']
	/** ID личного кабинета пользователя авторизированного через токен - в который будет добавляться user */
	personalarea_id: Scalars['ID']['input']
	/** В запросе должен быть обязательно либо email, либо phone */
	phone?: InputMaybe<Scalars['String']['input']>
	/** manager/cassier */
	role: UserRoleEnum
}

export type UserLogin = {
	email: Scalars['String']['input']
	password: Scalars['String']['input']
	phone?: InputMaybe<Scalars['String']['input']>
}

export type UserRegistration = {
	agreement: Scalars['Boolean']['input']
	email: Scalars['String']['input']
	father_name: Scalars['String']['input']
	first_name: Scalars['String']['input']
	last_name: Scalars['String']['input']
	password: Scalars['String']['input']
	password_confirmation: Scalars['String']['input']
	phone?: InputMaybe<Scalars['String']['input']>
}

export enum UserRoleEnum {
	Cassier = 'cassier',
	Manager = 'manager'
}

export type Workspace = {
	__typename?: 'Workspace'
	created_at: Scalars['Date']['output']
	description?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	is_active: Scalars['Boolean']['output']
	name: Scalars['String']['output']
	organization: Organization
	payment?: Maybe<Payment>
	updated_at: Scalars['Date']['output']
	user_owner: User
	/** Пользователь который работает в данный момент под workspace */
	user_worker?: Maybe<User>
}

export type WorkspaceCreate = {
	description?: InputMaybe<Scalars['String']['input']>
	is_active?: InputMaybe<Scalars['Boolean']['input']>
	name: Scalars['String']['input']
	organization_id: Scalars['String']['input']
	payment_id?: InputMaybe<Scalars['String']['input']>
}

export type LoginMutationVariables = Exact<{
	input: UserLogin
}>

export type LoginMutation = {
	__typename?: 'Mutation'
	login: { __typename?: 'AuthToken'; access_token?: string | null }
}

export type UserInfoFragment = {
	__typename?: 'User'
	id: string
	first_name?: string | null
	last_name?: string | null
	father_name?: string | null
	role: UserRoleEnum
	permission: number
	active: boolean
	auth: boolean
	email?: string | null
	phone?: string | null
	created_at: any
	updated_at: any
}

export type OrganizationInfoFragment = {
	__typename?: 'Organization'
	id: string
	name: string
	address: string
	type: OrganizationTypeEnum
	okved?: string | null
	founded_date?: string | null
	inn: string
	kpp?: string | null
	registration_number: string
	created_at: any
	updated_at: any
	owner: {
		__typename?: 'User'
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		email?: string | null
		phone?: string | null
	}
	users: Array<{
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
	}>
}

export type SubscriptionInfoFragment = {
	__typename?: 'SubscriptionPlan'
	plan_name: string
	price: number
	expires_at: any
	created_at: any
}

export type PersonalAreaInfoFragment = {
	__typename?: 'PersonalArea'
	id: string
	balance: number
	created_at: any
	owner: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
	}
	subscription: {
		__typename?: 'SubscriptionPlan'
		plan_name: string
		price: number
		expires_at: any
		created_at: any
	}
}

export type UserFragmentFragment = {
	__typename?: 'User'
	first_name?: string | null
	last_name?: string | null
	father_name?: string | null
	role: UserRoleEnum
	permission: number
	active: boolean
	email?: string | null
	phone?: string | null
	created_at: any
	updated_at: any
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
	__typename?: 'Query'
	authMe?: {
		__typename?: 'User'
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		permission: number
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
		updated_at: any
	} | null
}

export type AuthLogoutMutationVariables = Exact<{ [key: string]: never }>

export type AuthLogoutMutation = { __typename?: 'Mutation'; authLogout: string }

export type AuthRefreshTokenMutationVariables = Exact<{ [key: string]: never }>

export type AuthRefreshTokenMutation = {
	__typename?: 'Mutation'
	authRefresh: { __typename?: 'AuthToken'; access_token?: string | null }
}

export const UserInfoFragmentDoc = gql`
	fragment UserInfo on User {
		id
		first_name
		last_name
		father_name
		role
		permission
		active
		auth
		email
		phone
		created_at
		updated_at
	}
`
export const OrganizationInfoFragmentDoc = gql`
	fragment OrganizationInfo on Organization {
		id
		name
		address
		type
		okved
		founded_date
		inn
		kpp
		registration_number
		owner {
			first_name
			last_name
			father_name
			email
			phone
		}
		users {
			id
			first_name
			last_name
			father_name
		}
		created_at
		updated_at
	}
`
export const SubscriptionInfoFragmentDoc = gql`
	fragment SubscriptionInfo on SubscriptionPlan {
		plan_name
		price
		expires_at
		created_at
	}
`
export const PersonalAreaInfoFragmentDoc = gql`
	fragment PersonalAreaInfo on PersonalArea {
		id
		owner {
			id
			first_name
			last_name
			father_name
		}
		balance
		subscription {
			...SubscriptionInfo
		}
		created_at
	}
`
export const UserFragmentFragmentDoc = gql`
	fragment UserFragment on User {
		first_name
		last_name
		father_name
		role
		permission
		active
		email
		phone
		created_at
		updated_at
	}
`
export const LoginDocument = gql`
	mutation login($input: UserLogin!) {
		login(input: $input) {
			access_token
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
export const GetMeDocument = gql`
	query GetMe {
		authMe {
			...UserFragment
		}
	}
	${UserFragmentFragmentDoc}
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options)
}
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options)
}
export function useGetMeSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options)
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>
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
export const AuthRefreshTokenDocument = gql`
	mutation AuthRefreshToken {
		authRefresh {
			access_token
		}
	}
`
export type AuthRefreshTokenMutationFn = Apollo.MutationFunction<
	AuthRefreshTokenMutation,
	AuthRefreshTokenMutationVariables
>

/**
 * __useAuthRefreshTokenMutation__
 *
 * To run a mutation, you first call `useAuthRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRefreshTokenMutation, { data, loading, error }] = useAuthRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthRefreshTokenMutation(
	baseOptions?: Apollo.MutationHookOptions<AuthRefreshTokenMutation, AuthRefreshTokenMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<AuthRefreshTokenMutation, AuthRefreshTokenMutationVariables>(
		AuthRefreshTokenDocument,
		options
	)
}
export type AuthRefreshTokenMutationHookResult = ReturnType<typeof useAuthRefreshTokenMutation>
export type AuthRefreshTokenMutationResult = Apollo.MutationResult<AuthRefreshTokenMutation>
export type AuthRefreshTokenMutationOptions = Apollo.BaseMutationOptions<
	AuthRefreshTokenMutation,
	AuthRefreshTokenMutationVariables
>
