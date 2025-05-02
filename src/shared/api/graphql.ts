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

export type AddPaymentWorkspaceInput = {
	payment_method_id: Scalars['ID']['input']
	workspace_id: Scalars['ID']['input']
}

export type AddUserWorkspaceInput = {
	/** пользователь который добавляется к workspace */
	user_id: Scalars['String']['input']
	/** worksapce к которому добавляется пользователь */
	workspace_id: Scalars['String']['input']
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

export type CreateTransactionInput = {
	/** Сумма для оплаты */
	amount: Scalars['String']['input']
	/** Количество товара */
	count_product?: InputMaybe<Scalars['Int']['input']>
	/** Высота картинки QR - стилизация* */
	height?: InputMaybe<Scalars['Int']['input']>
	/** Название продукта */
	name_product?: InputMaybe<Scalars['String']['input']>
	/** Тип QR кода - динамический или статический */
	qr_type: QrTypeEnum
	/** (Период использования QR-кода в минутах) Задается, только если тип QR = QR-Dynamic */
	ttl?: InputMaybe<Scalars['Int']['input']>
	/** Тип продукта, услуга/товар и т.д...  */
	type_product?: InputMaybe<Scalars['String']['input']>
	/** Ширина картинки QR - стилизация* */
	width?: InputMaybe<Scalars['Int']['input']>
	workspace_id: Scalars['ID']['input']
}

export type DeleteUserResponse = {
	__typename?: 'DeleteUserResponse'
	/** статус удаления */
	status: Scalars['Boolean']['output']
	/** uuid удаленного user */
	user_id: Scalars['String']['output']
}

export type DeleteUserWorkspaceInput = {
	/** пользователь который добавляется к workspace */
	user_id: Scalars['String']['input']
	/** worksapce к которому добавляется пользователь */
	workspace_id: Scalars['String']['input']
}

/** Таблица 'значения => ключь' для подключения к внешнему сервису */
export type DriverInfo = {
	__typename?: 'DriverInfo'
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	/** Название ключа например API Key или Seecret Key */
	key: Scalars['String']['output']
	/** К какой организации относится этот пользователь */
	organization: Organization
	payment_method: PaymentMethod
	updated_at: Scalars['Date']['output']
	/** Пользователь который указал значение */
	user: User
	/** Значение ключа */
	value: Scalars['String']['output']
}

export type DriverInfoInput = {
	/** Название ключа например API Key или Seecret Key */
	key: Scalars['String']['input']
	/** К какой организации относится этот пользователь */
	organization_id: Scalars['ID']['input']
	/** Driver платежа */
	payment_method_id: Scalars['ID']['input']
	/** Значение ключа */
	value: Scalars['String']['input']
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
	/** Добавление Payment к workspace */
	addPaymentWorkspace: Workspace
	/** Добавление Пользователя к workspace */
	addUserWorkspace: User
	/** Выходим из авторизации - токены инвалидируются */
	authLogout: Scalars['String']['output']
	/** Обновляем токены - access/refresh */
	authRefresh: AuthToken
	/** Устанавливаем полезную нагрузку, получаем новый access токен */
	authSetPayload: AuthToken
	/** Создание записи апи ключей: key => value */
	createDriverInfo: DriverInfo
	/** Создание организации по авторизированному пользователю */
	createOrganization: Organization
	/** Создание организации по авторизированному пользователю */
	createTransaction: Transaction
	/** Создание рабочего места по авторизированному пользователю */
	createWorkspace: Workspace
	/** Удаляем пользователя из workspace */
	deleteUserWorkspace: DeleteUserResponse
	login: AuthToken
	/** Регистрация пользователя */
	registration: AuthToken
	/** Указание user в работу (устаналиваем кто будет работать за workspace) */
	setWorkUserWorkspace: User
	updateUser: User
	/** Создание пользователя cassier/manager */
	userCreate: User
}

export type MutationAddPaymentWorkspaceArgs = {
	input?: InputMaybe<AddPaymentWorkspaceInput>
}

export type MutationAddUserWorkspaceArgs = {
	input: AddUserWorkspaceInput
}

export type MutationAuthSetPayloadArgs = {
	organization_id: Scalars['ID']['input']
}

export type MutationCreateDriverInfoArgs = {
	input: DriverInfoInput
}

export type MutationCreateOrganizationArgs = {
	input: OrganizationCreateInput
}

export type MutationCreateTransactionArgs = {
	input: CreateTransactionInput
}

export type MutationCreateWorkspaceArgs = {
	input: WorkspaceCreateInput
}

export type MutationDeleteUserWorkspaceArgs = {
	input: DeleteUserWorkspaceInput
}

export type MutationLoginArgs = {
	input: UserLoginInput
}

export type MutationRegistrationArgs = {
	input: UserRegistration
}

export type MutationSetWorkUserWorkspaceArgs = {
	input: SetWorkUserWorkspaceInput
}

export type MutationUpdateUserArgs = {
	input: UpdateUserInput
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

export type OrganizationCreateInput = {
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
	Individual = 'INDIVIDUAL',
	Legal = 'LEGAL'
}

export type PaginatorInfo = {
	__typename?: 'PaginatorInfo'
	/** Номер текущей страницы */
	currentPage: Scalars['Int']['output']
	/** Элементов на странице */
	limit: Scalars['Int']['output']
	/** Всего элементов */
	total: Scalars['Int']['output']
	/** Сколько всего страниц */
	totalPages: Scalars['Int']['output']
}

/** Подразумевает некий выбор категории платежей пример: Банки, Внешние интеграции, API - просто названия категорий */
export type Payment = {
	__typename?: 'Payment'
	created_at: Scalars['Date']['output']
	/** Uuid */
	id: Scalars['ID']['output']
	/** Название платежного метода */
	name: Scalars['String']['output']
	/** Автоинкриментированный id - сделан для удобности обращения */
	number_id: Scalars['ID']['output']
	payment_methods: Array<Maybe<PaymentMethod>>
	/** Статус Активена ли категория Payment () */
	status: Scalars['Boolean']['output']
	updated_at: Scalars['Date']['output']
}

export type PaymentMethod = {
	__typename?: 'PaymentMethod'
	active: Scalars['Boolean']['output']
	created_at: Scalars['Date']['output']
	driver_infos?: Maybe<DriverInfo>
	/** Название драйвера например: Сбербанк, Точка банк */
	driver_name: Scalars['String']['output']
	/** Uuid */
	id: Scalars['ID']['output']
	/** Автоинкриментированный id - сделан для удобности обращения */
	number_id: Scalars['Int']['output']
	payment?: Maybe<Payment>
	/** Логотип */
	png_url: Scalars['String']['output']
	updated_at: Scalars['Date']['output']
}

export type PersonalArea = {
	__typename?: 'PersonalArea'
	balance: Scalars['String']['output']
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
	/** Сумма - должна быть только при динамическом QR - DYNAMIC */
	amount?: Maybe<Scalars['String']['output']>
	/** Бинарный формат изображения */
	content_image_base64: Scalars['String']['output']
	created_at: Scalars['Date']['output']
	/** Высота изображения */
	height?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	name_product?: Maybe<Scalars['String']['output']>
	/** Тип QR: DYNAMIC/STATIC  */
	qr_type: QrTypeEnum
	/** Ссылка на изображения */
	qr_url: Scalars['String']['output']
	/** К какой транзакции принадлежит QR */
	transaction: Transaction
	/** Время существования QR - только у DYNAMIC */
	ttl?: Maybe<Scalars['String']['output']>
	updated_at: Scalars['Date']['output']
	/** Ширина изображения */
	width?: Maybe<Scalars['String']['output']>
}

export enum QrTypeEnum {
	Dynamic = 'DYNAMIC',
	Static = 'STATIC'
}

export type Query = {
	__typename?: 'Query'
	/** Получаем модель User */
	authMe?: Maybe<User>
	/** Возвратить DriverInfo по id */
	driverInfoById: DriverInfo
	/** Возвратить DriverInfo по organization_id и payment_id */
	driverInfoByOrganizationId?: Maybe<DriverInfo>
	/** Вернуть все значение интеграций у авторизированного User */
	driverInfosByUser: Array<Maybe<DriverInfo>>
	organization?: Maybe<Organization>
	organizations: Array<Maybe<Organization>>
	/** Найти по id */
	paymentById?: Maybe<Payment>
	/** Найти по автоинкрементированному-уникальному ключу id */
	paymentByNumberId?: Maybe<Payment>
	paymentMethodById: PaymentMethod
	paymentMethodByNumberId?: Maybe<PaymentMethod>
	paymentMethods: Array<Maybe<PaymentMethod>>
	payments: Array<Maybe<Payment>>
	/** Вернуть qrCode по ID */
	qrCode?: Maybe<QrCode>
	/** Вернуть транзакцию по ID */
	transaction?: Maybe<Transaction>
	userById?: Maybe<User>
	/** Вернуть workspace по id */
	workspace?: Maybe<Workspace>
	/** Вернуть все workspaces */
	workspaces: WorkspacePaginator
}

export type QueryDriverInfoByIdArgs = {
	id: Scalars['ID']['input']
}

export type QueryDriverInfoByOrganizationIdArgs = {
	input?: InputMaybe<DriverInfoByOrganizationIdInput>
}

export type QueryOrganizationArgs = {
	id: Scalars['ID']['input']
}

export type QueryPaymentByIdArgs = {
	id: Scalars['ID']['input']
}

export type QueryPaymentByNumberIdArgs = {
	number_id?: InputMaybe<Scalars['Int']['input']>
}

export type QueryPaymentMethodByIdArgs = {
	id: Scalars['ID']['input']
}

export type QueryPaymentMethodByNumberIdArgs = {
	number_id: Scalars['Int']['input']
}

export type QueryQrCodeArgs = {
	id: Scalars['ID']['input']
}

export type QueryTransactionArgs = {
	id: Scalars['ID']['input']
}

export type QueryUserByIdArgs = {
	id: Scalars['ID']['input']
}

export type QueryWorkspaceArgs = {
	id: Scalars['ID']['input']
}

export type QueryWorkspacesArgs = {
	count?: InputMaybe<Scalars['Int']['input']>
	page?: InputMaybe<Scalars['Int']['input']>
}

export type SetWorkUserWorkspaceInput = {
	/** пользователь который добавляется к workspace */
	user_id: Scalars['String']['input']
	/** worksapce к которому добавляется пользователь */
	workspace_id: Scalars['String']['input']
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
	/** Дата окончания подписки, если null - подписка не ограничена */
	expires_at?: Maybe<Scalars['Date']['output']>
	id: Scalars['ID']['output']
	plan_name: Scalars['String']['output']
	price: Scalars['String']['output']
	updated_at: Scalars['Date']['output']
}

export type Transaction = {
	__typename?: 'Transaction'
	amount: Scalars['String']['output']
	count_product?: Maybe<Scalars['String']['output']>
	created_at: Scalars['Date']['output']
	id: Scalars['ID']['output']
	name_product?: Maybe<Scalars['String']['output']>
	number_uuid: Scalars['String']['output']
	qr_code: QrCode
	status: TransactionStatusEnum
	type_product?: Maybe<Scalars['String']['output']>
	updated_at: Scalars['Date']['output']
	workspace: Workspace
}

export enum TransactionStatusEnum {
	Cancelled = 'CANCELLED',
	Completed = 'COMPLETED',
	Pending = 'PENDING',
	WaitingForCapture = 'WAITING_FOR_CAPTURE'
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

export type UpdateUserInput = {
	active?: InputMaybe<Scalars['Boolean']['input']>
	role?: InputMaybe<UserRoleEnum>
	user_id: Scalars['String']['input']
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
	/** Вернуть все личные кабинеты к которым принадлежит пользователь */
	workspaces: Array<Maybe<Workspace>>
}

export type UserCreate = {
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

export type UserLoginInput = {
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
	Admin = 'ADMIN',
	Cassier = 'CASSIER',
	Manager = 'MANAGER'
}

export type Workspace = {
	__typename?: 'Workspace'
	created_at: Scalars['Date']['output']
	description?: Maybe<Scalars['String']['output']>
	id: Scalars['ID']['output']
	is_active: Scalars['Boolean']['output']
	name: Scalars['String']['output']
	organization: Organization
	paymentMethod?: Maybe<PaymentMethod>
	transactions: Array<Maybe<Transaction>>
	updated_at: Scalars['Date']['output']
	/** Пользователь - создатель workspace */
	user_owner: User
	/** Пользователь который работает в данный момент под workspace */
	user_worker?: Maybe<User>
	/** Вернуть пользователей относящийся к workspace */
	users: Array<Maybe<User>>
}

export type WorkspaceCreateInput = {
	description?: InputMaybe<Scalars['String']['input']>
	is_active?: InputMaybe<Scalars['Boolean']['input']>
	name: Scalars['String']['input']
	organization_id: Scalars['String']['input']
	/** Драйвер оплаты: Тинькофф, Сберабанк, Точка */
	payment_method_id?: InputMaybe<Scalars['String']['input']>
}

export type WorkspacePaginator = {
	__typename?: 'WorkspacePaginator'
	data: Array<Maybe<Workspace>>
	paginatorInfo: PaginatorInfo
}

export type DeleteUserWorkspace = {
	__typename?: 'deleteUserWorkspace'
	status: Scalars['Boolean']['output']
	workspace: Workspace
}

export type DriverInfoByOrganizationIdInput = {
	organization_id: Scalars['ID']['input']
	payment_method_id: Scalars['ID']['input']
}

export type CreateDriverInfoMutationVariables = Exact<{
	input: DriverInfoInput
}>

export type CreateDriverInfoMutation = {
	__typename?: 'Mutation'
	createDriverInfo: {
		__typename?: 'DriverInfo'
		id: string
		key: string
		value: string
		created_at: any
		user: {
			__typename?: 'User'
			id: string
			father_name?: string | null
			first_name?: string | null
			last_name?: string | null
		}
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		payment_method: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		}
	}
}

export type GetIntegrationQueryVariables = Exact<{
	id: Scalars['ID']['input']
}>

export type GetIntegrationQuery = {
	__typename?: 'Query'
	driverInfoById: {
		__typename?: 'DriverInfo'
		id: string
		key: string
		value: string
		created_at: any
		user: {
			__typename?: 'User'
			id: string
			father_name?: string | null
			first_name?: string | null
			last_name?: string | null
		}
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		payment_method: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		}
	}
}

export type GetIntegrationsQueryVariables = Exact<{ [key: string]: never }>

export type GetIntegrationsQuery = {
	__typename?: 'Query'
	driverInfosByUser: Array<{
		__typename?: 'DriverInfo'
		id: string
		key: string
		value: string
		created_at: any
		user: {
			__typename?: 'User'
			id: string
			father_name?: string | null
			first_name?: string | null
			last_name?: string | null
		}
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		payment_method: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		}
	} | null>
}

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type GetOrganizationsQuery = {
	__typename?: 'Query'
	organizations: Array<{
		__typename?: 'Organization'
		id: string
		name: string
		address: string
		type: OrganizationTypeEnum
		okved?: string | null
		founded_date?: string | null
		registration_number: string
		inn: string
		kpp?: string | null
	} | null>
}

export type GetOrganizationQueryVariables = Exact<{
	id: Scalars['ID']['input']
}>

export type GetOrganizationQuery = {
	__typename?: 'Query'
	organization?: {
		__typename?: 'Organization'
		id: string
		name: string
		address: string
		type: OrganizationTypeEnum
		okved?: string | null
		founded_date?: string | null
		registration_number: string
		inn: string
		kpp?: string | null
	} | null
}

export type CreateOrganizationMutationVariables = Exact<{
	input: OrganizationCreateInput
}>

export type CreateOrganizationMutation = {
	__typename?: 'Mutation'
	createOrganization: {
		__typename?: 'Organization'
		id: string
		name: string
		address: string
		type: OrganizationTypeEnum
		okved?: string | null
		founded_date?: string | null
		registration_number: string
		inn: string
		kpp?: string | null
	}
}

export type GetMembersQueryVariables = Exact<{
	organizationId: Scalars['ID']['input']
}>

export type GetMembersQuery = {
	__typename?: 'Query'
	organization?: {
		__typename?: 'Organization'
		users: Array<{
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		}>
	} | null
}

export type CreateMemberMutationVariables = Exact<{
	input: UserCreate
}>

export type CreateMemberMutation = {
	__typename?: 'Mutation'
	userCreate: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	}
}

export type GetPaymentMethodsQueryVariables = Exact<{ [key: string]: never }>

export type GetPaymentMethodsQuery = {
	__typename?: 'Query'
	paymentMethods: Array<{
		__typename?: 'PaymentMethod'
		id: string
		active: boolean
		driver_name: string
		created_at: any
	} | null>
}

export type CreateTransactionMutationVariables = Exact<{
	input: CreateTransactionInput
}>

export type CreateTransactionMutation = {
	__typename?: 'Mutation'
	createTransaction: {
		__typename?: 'Transaction'
		id: string
		status: TransactionStatusEnum
		amount: string
		type_product?: string | null
		count_product?: string | null
		name_product?: string | null
		created_at: any
		workspace: { __typename?: 'Workspace'; id: string }
		qr_code: {
			__typename?: 'QrCode'
			qr_url: string
			qr_type: QrTypeEnum
			amount?: string | null
			content_image_base64: string
		}
	}
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
	__typename?: 'Query'
	authMe?: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
		personalAreas: Array<{
			__typename?: 'PersonalArea'
			id: string
			balance: string
			created_at: any
			owner: {
				__typename?: 'User'
				id: string
				first_name?: string | null
				last_name?: string | null
				father_name?: string | null
				role: UserRoleEnum
				active: boolean
				email?: string | null
				phone?: string | null
				created_at: any
			}
			subscription: {
				__typename?: 'SubscriptionPlan'
				id: string
				plan_name: string
				price: string
				expires_at?: any | null
			}
		}>
	} | null
}

export type GetWorkspacesQueryVariables = Exact<{
	page?: InputMaybe<Scalars['Int']['input']>
	count?: InputMaybe<Scalars['Int']['input']>
}>

export type GetWorkspacesQuery = {
	__typename?: 'Query'
	workspaces: {
		__typename?: 'WorkspacePaginator'
		data: Array<{
			__typename?: 'Workspace'
			id: string
			name: string
			description?: string | null
			is_active: boolean
			created_at: any
			organization: {
				__typename?: 'Organization'
				id: string
				name: string
				address: string
				type: OrganizationTypeEnum
				okved?: string | null
				founded_date?: string | null
				registration_number: string
				inn: string
				kpp?: string | null
			}
			users: Array<{
				__typename?: 'User'
				id: string
				first_name?: string | null
				last_name?: string | null
				father_name?: string | null
				role: UserRoleEnum
				active: boolean
				email?: string | null
				phone?: string | null
				created_at: any
			} | null>
			user_worker?: {
				__typename?: 'User'
				id: string
				first_name?: string | null
				last_name?: string | null
				father_name?: string | null
				role: UserRoleEnum
				active: boolean
				email?: string | null
				phone?: string | null
				created_at: any
			} | null
			user_owner: {
				__typename?: 'User'
				id: string
				first_name?: string | null
				last_name?: string | null
				father_name?: string | null
				role: UserRoleEnum
				active: boolean
				email?: string | null
				phone?: string | null
				created_at: any
			}
			paymentMethod?: {
				__typename?: 'PaymentMethod'
				id: string
				active: boolean
				driver_name: string
				created_at: any
			} | null
		} | null>
		paginatorInfo: {
			__typename?: 'PaginatorInfo'
			limit: number
			currentPage: number
			total: number
			totalPages: number
		}
	}
}

export type GetWorkspaceQueryVariables = Exact<{
	id: Scalars['ID']['input']
}>

export type GetWorkspaceQuery = {
	__typename?: 'Query'
	workspace?: {
		__typename?: 'Workspace'
		id: string
		name: string
		description?: string | null
		is_active: boolean
		created_at: any
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		users: Array<{
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null>
		user_worker?: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null
		user_owner: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		}
		paymentMethod?: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		} | null
	} | null
}

export type CreateWorkspaceMutationVariables = Exact<{
	input: WorkspaceCreateInput
}>

export type CreateWorkspaceMutation = {
	__typename?: 'Mutation'
	createWorkspace: {
		__typename?: 'Workspace'
		id: string
		name: string
		description?: string | null
		is_active: boolean
		created_at: any
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		users: Array<{
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null>
		user_worker?: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null
		user_owner: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		}
		paymentMethod?: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		} | null
	}
}

export type AddUserToWorkspaceMutationVariables = Exact<{
	input: AddUserWorkspaceInput
}>

export type AddUserToWorkspaceMutation = {
	__typename?: 'Mutation'
	addUserWorkspace: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	}
}

export type GetWorkspaceMembersQueryVariables = Exact<{
	workspaceId: Scalars['ID']['input']
}>

export type GetWorkspaceMembersQuery = {
	__typename?: 'Query'
	workspace?: {
		__typename?: 'Workspace'
		users: Array<{
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null>
	} | null
}

export type RemoveUserFromWorkspaceMutationVariables = Exact<{
	input: DeleteUserWorkspaceInput
}>

export type RemoveUserFromWorkspaceMutation = {
	__typename?: 'Mutation'
	deleteUserWorkspace: { __typename?: 'DeleteUserResponse'; status: boolean }
}

export type SetWorkUserWorkspaceMutationVariables = Exact<{
	input: SetWorkUserWorkspaceInput
}>

export type SetWorkUserWorkspaceMutation = {
	__typename?: 'Mutation'
	setWorkUserWorkspace: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	}
}

export type AddPaymentMethodToWorkspaceMutationVariables = Exact<{
	input: AddPaymentWorkspaceInput
}>

export type AddPaymentMethodToWorkspaceMutation = {
	__typename?: 'Mutation'
	addPaymentWorkspace: {
		__typename?: 'Workspace'
		id: string
		name: string
		description?: string | null
		is_active: boolean
		created_at: any
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		users: Array<{
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null>
		user_worker?: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null
		user_owner: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		}
		paymentMethod?: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		} | null
	}
}

export type LoginMutationVariables = Exact<{
	input: UserLoginInput
}>

export type LoginMutation = {
	__typename?: 'Mutation'
	login: { __typename?: 'AuthToken'; access_token?: string | null }
}

export type RegisterMutationVariables = Exact<{
	input: UserRegistration
}>

export type RegisterMutation = {
	__typename?: 'Mutation'
	registration: { __typename?: 'AuthToken'; access_token?: string | null }
}

export type AuthLogoutMutationVariables = Exact<{ [key: string]: never }>

export type AuthLogoutMutation = { __typename?: 'Mutation'; authLogout: string }

export type AuthRefreshTokenMutationVariables = Exact<{ [key: string]: never }>

export type AuthRefreshTokenMutation = {
	__typename?: 'Mutation'
	authRefresh: { __typename?: 'AuthToken'; access_token?: string | null }
}

export type SubscriptionInfoFragment = {
	__typename?: 'SubscriptionPlan'
	plan_name: string
	price: string
	expires_at?: any | null
	created_at: any
}

export type PersonalAreaInfoFragment = {
	__typename?: 'PersonalArea'
	id: string
	balance: string
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
		price: string
		expires_at?: any | null
		created_at: any
	}
}

export type PaginationFragmentFragment = {
	__typename?: 'PaginatorInfo'
	limit: number
	currentPage: number
	total: number
	totalPages: number
}

export type OrganizationBaseFragmentFragment = {
	__typename?: 'Organization'
	id: string
	name: string
	address: string
	type: OrganizationTypeEnum
	okved?: string | null
	founded_date?: string | null
	registration_number: string
	inn: string
	kpp?: string | null
}

export type UserBaseFragmentFragment = {
	__typename?: 'User'
	id: string
	first_name?: string | null
	last_name?: string | null
	father_name?: string | null
	role: UserRoleEnum
	active: boolean
	email?: string | null
	phone?: string | null
	created_at: any
}

export type PaymentMethodBaseFragmentFragment = {
	__typename?: 'PaymentMethod'
	id: string
	active: boolean
	driver_name: string
	created_at: any
}

export type WorkspaceBaseFragmentFragment = {
	__typename?: 'Workspace'
	id: string
	name: string
	description?: string | null
	is_active: boolean
	created_at: any
	paymentMethod?: {
		__typename?: 'PaymentMethod'
		id: string
		active: boolean
		driver_name: string
		created_at: any
	} | null
}

export type SubscriptionFragmentFragment = {
	__typename?: 'SubscriptionPlan'
	id: string
	plan_name: string
	price: string
	expires_at?: any | null
}

export type PersonalAreaBaseFragmentFragment = {
	__typename?: 'PersonalArea'
	id: string
	balance: string
	created_at: any
	owner: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	}
	subscription: {
		__typename?: 'SubscriptionPlan'
		id: string
		plan_name: string
		price: string
		expires_at?: any | null
	}
}

export type OrganizationFragmentFragment = {
	__typename?: 'Organization'
	id: string
	name: string
	address: string
	type: OrganizationTypeEnum
	okved?: string | null
	founded_date?: string | null
	registration_number: string
	inn: string
	kpp?: string | null
}

export type UserFragmentFragment = {
	__typename?: 'User'
	id: string
	first_name?: string | null
	last_name?: string | null
	father_name?: string | null
	role: UserRoleEnum
	active: boolean
	email?: string | null
	phone?: string | null
	created_at: any
	workspaces: Array<{
		__typename?: 'Workspace'
		id: string
		name: string
		description?: string | null
		is_active: boolean
		created_at: any
		paymentMethod?: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		} | null
	} | null>
	organizations?: Array<{
		__typename?: 'Organization'
		id: string
		name: string
		address: string
		type: OrganizationTypeEnum
		okved?: string | null
		founded_date?: string | null
		registration_number: string
		inn: string
		kpp?: string | null
	} | null> | null
}

export type WorkspaceFragmentFragment = {
	__typename?: 'Workspace'
	id: string
	name: string
	description?: string | null
	is_active: boolean
	created_at: any
	organization: {
		__typename?: 'Organization'
		id: string
		name: string
		address: string
		type: OrganizationTypeEnum
		okved?: string | null
		founded_date?: string | null
		registration_number: string
		inn: string
		kpp?: string | null
	}
	users: Array<{
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	} | null>
	user_worker?: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	} | null
	user_owner: {
		__typename?: 'User'
		id: string
		first_name?: string | null
		last_name?: string | null
		father_name?: string | null
		role: UserRoleEnum
		active: boolean
		email?: string | null
		phone?: string | null
		created_at: any
	}
	paymentMethod?: {
		__typename?: 'PaymentMethod'
		id: string
		active: boolean
		driver_name: string
		created_at: any
	} | null
}

export type WorkspacePaginatedFragmentFragment = {
	__typename?: 'WorkspacePaginator'
	data: Array<{
		__typename?: 'Workspace'
		id: string
		name: string
		description?: string | null
		is_active: boolean
		created_at: any
		organization: {
			__typename?: 'Organization'
			id: string
			name: string
			address: string
			type: OrganizationTypeEnum
			okved?: string | null
			founded_date?: string | null
			registration_number: string
			inn: string
			kpp?: string | null
		}
		users: Array<{
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null>
		user_worker?: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		} | null
		user_owner: {
			__typename?: 'User'
			id: string
			first_name?: string | null
			last_name?: string | null
			father_name?: string | null
			role: UserRoleEnum
			active: boolean
			email?: string | null
			phone?: string | null
			created_at: any
		}
		paymentMethod?: {
			__typename?: 'PaymentMethod'
			id: string
			active: boolean
			driver_name: string
			created_at: any
		} | null
	} | null>
	paginatorInfo: {
		__typename?: 'PaginatorInfo'
		limit: number
		currentPage: number
		total: number
		totalPages: number
	}
}

export type QrCodeBaseFragmentFragment = {
	__typename?: 'QrCode'
	qr_url: string
	qr_type: QrTypeEnum
	amount?: string | null
	content_image_base64: string
}

export type TransactionFragmentFragment = {
	__typename?: 'Transaction'
	id: string
	status: TransactionStatusEnum
	amount: string
	type_product?: string | null
	count_product?: string | null
	name_product?: string | null
	created_at: any
	workspace: { __typename?: 'Workspace'; id: string }
	qr_code: {
		__typename?: 'QrCode'
		qr_url: string
		qr_type: QrTypeEnum
		amount?: string | null
		content_image_base64: string
	}
}

export type DriverInfoBaseFragmentFragment = {
	__typename?: 'DriverInfo'
	id: string
	key: string
	value: string
	created_at: any
}

export type DriverInfoFragmentFragment = {
	__typename?: 'DriverInfo'
	id: string
	key: string
	value: string
	created_at: any
	user: {
		__typename?: 'User'
		id: string
		father_name?: string | null
		first_name?: string | null
		last_name?: string | null
	}
	organization: {
		__typename?: 'Organization'
		id: string
		name: string
		address: string
		type: OrganizationTypeEnum
		okved?: string | null
		founded_date?: string | null
		registration_number: string
		inn: string
		kpp?: string | null
	}
	payment_method: { __typename?: 'PaymentMethod'; id: string; active: boolean; driver_name: string; created_at: any }
}

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
export const UserBaseFragmentFragmentDoc = gql`
	fragment UserBaseFragment on User {
		id
		first_name
		last_name
		father_name
		role
		active
		email
		phone
		created_at
	}
`
export const SubscriptionFragmentFragmentDoc = gql`
	fragment SubscriptionFragment on SubscriptionPlan {
		id
		plan_name
		price
		expires_at
	}
`
export const PersonalAreaBaseFragmentFragmentDoc = gql`
	fragment PersonalAreaBaseFragment on PersonalArea {
		id
		owner {
			...UserBaseFragment
		}
		balance
		subscription {
			...SubscriptionFragment
		}
		created_at
	}
`
export const OrganizationBaseFragmentFragmentDoc = gql`
	fragment OrganizationBaseFragment on Organization {
		id
		name
		address
		type
		okved
		founded_date
		registration_number
		inn
		kpp
	}
`
export const OrganizationFragmentFragmentDoc = gql`
	fragment OrganizationFragment on Organization {
		...OrganizationBaseFragment
	}
`
export const PaymentMethodBaseFragmentFragmentDoc = gql`
	fragment PaymentMethodBaseFragment on PaymentMethod {
		id
		active
		driver_name
		created_at
	}
`
export const WorkspaceBaseFragmentFragmentDoc = gql`
	fragment WorkspaceBaseFragment on Workspace {
		id
		name
		paymentMethod {
			...PaymentMethodBaseFragment
		}
		description
		is_active
		created_at
	}
`
export const UserFragmentFragmentDoc = gql`
	fragment UserFragment on User {
		...UserBaseFragment
		workspaces {
			...WorkspaceBaseFragment
		}
		organizations {
			...OrganizationBaseFragment
		}
	}
`
export const WorkspaceFragmentFragmentDoc = gql`
	fragment WorkspaceFragment on Workspace {
		...WorkspaceBaseFragment
		organization {
			...OrganizationBaseFragment
		}
		users {
			...UserBaseFragment
		}
		user_worker {
			...UserBaseFragment
		}
		user_owner {
			...UserBaseFragment
		}
	}
`
export const PaginationFragmentFragmentDoc = gql`
	fragment PaginationFragment on PaginatorInfo {
		limit
		currentPage
		total
		totalPages
	}
`
export const WorkspacePaginatedFragmentFragmentDoc = gql`
	fragment WorkspacePaginatedFragment on WorkspacePaginator {
		data {
			...WorkspaceFragment
		}
		paginatorInfo {
			...PaginationFragment
		}
	}
`
export const QrCodeBaseFragmentFragmentDoc = gql`
	fragment QRCodeBaseFragment on QrCode {
		qr_url
		qr_type
		amount
		content_image_base64
	}
`
export const TransactionFragmentFragmentDoc = gql`
	fragment TransactionFragment on Transaction {
		id
		status
		amount
		type_product
		count_product
		name_product
		workspace {
			id
		}
		qr_code {
			...QRCodeBaseFragment
		}
		created_at
	}
`
export const DriverInfoBaseFragmentFragmentDoc = gql`
	fragment DriverInfoBaseFragment on DriverInfo {
		id
		key
		value
		created_at
	}
`
export const DriverInfoFragmentFragmentDoc = gql`
	fragment DriverInfoFragment on DriverInfo {
		...DriverInfoBaseFragment
		user {
			id
			father_name
			first_name
			last_name
		}
		organization {
			...OrganizationBaseFragment
		}
		payment_method {
			...PaymentMethodBaseFragment
		}
	}
`
export const CreateDriverInfoDocument = gql`
	mutation createDriverInfo($input: DriverInfoInput!) {
		createDriverInfo(input: $input) {
			...DriverInfoFragment
		}
	}
	${DriverInfoFragmentFragmentDoc}
	${DriverInfoBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
`
export type CreateDriverInfoMutationFn = Apollo.MutationFunction<
	CreateDriverInfoMutation,
	CreateDriverInfoMutationVariables
>

/**
 * __useCreateDriverInfoMutation__
 *
 * To run a mutation, you first call `useCreateDriverInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDriverInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDriverInfoMutation, { data, loading, error }] = useCreateDriverInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDriverInfoMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateDriverInfoMutation, CreateDriverInfoMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<CreateDriverInfoMutation, CreateDriverInfoMutationVariables>(
		CreateDriverInfoDocument,
		options
	)
}
export type CreateDriverInfoMutationHookResult = ReturnType<typeof useCreateDriverInfoMutation>
export type CreateDriverInfoMutationResult = Apollo.MutationResult<CreateDriverInfoMutation>
export type CreateDriverInfoMutationOptions = Apollo.BaseMutationOptions<
	CreateDriverInfoMutation,
	CreateDriverInfoMutationVariables
>
export const GetIntegrationDocument = gql`
	query getIntegration($id: ID!) {
		driverInfoById(id: $id) {
			...DriverInfoFragment
		}
	}
	${DriverInfoFragmentFragmentDoc}
	${DriverInfoBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
`

/**
 * __useGetIntegrationQuery__
 *
 * To run a query within a React component, call `useGetIntegrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIntegrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIntegrationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIntegrationQuery(
	baseOptions: Apollo.QueryHookOptions<GetIntegrationQuery, GetIntegrationQueryVariables> &
		({ variables: GetIntegrationQueryVariables; skip?: boolean } | { skip: boolean })
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetIntegrationQuery, GetIntegrationQueryVariables>(GetIntegrationDocument, options)
}
export function useGetIntegrationLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetIntegrationQuery, GetIntegrationQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetIntegrationQuery, GetIntegrationQueryVariables>(GetIntegrationDocument, options)
}
export function useGetIntegrationSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIntegrationQuery, GetIntegrationQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetIntegrationQuery, GetIntegrationQueryVariables>(GetIntegrationDocument, options)
}
export type GetIntegrationQueryHookResult = ReturnType<typeof useGetIntegrationQuery>
export type GetIntegrationLazyQueryHookResult = ReturnType<typeof useGetIntegrationLazyQuery>
export type GetIntegrationSuspenseQueryHookResult = ReturnType<typeof useGetIntegrationSuspenseQuery>
export type GetIntegrationQueryResult = Apollo.QueryResult<GetIntegrationQuery, GetIntegrationQueryVariables>
export const GetIntegrationsDocument = gql`
	query getIntegrations {
		driverInfosByUser {
			...DriverInfoFragment
		}
	}
	${DriverInfoFragmentFragmentDoc}
	${DriverInfoBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
`

/**
 * __useGetIntegrationsQuery__
 *
 * To run a query within a React component, call `useGetIntegrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIntegrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIntegrationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIntegrationsQuery(
	baseOptions?: Apollo.QueryHookOptions<GetIntegrationsQuery, GetIntegrationsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetIntegrationsQuery, GetIntegrationsQueryVariables>(GetIntegrationsDocument, options)
}
export function useGetIntegrationsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetIntegrationsQuery, GetIntegrationsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetIntegrationsQuery, GetIntegrationsQueryVariables>(GetIntegrationsDocument, options)
}
export function useGetIntegrationsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetIntegrationsQuery, GetIntegrationsQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetIntegrationsQuery, GetIntegrationsQueryVariables>(
		GetIntegrationsDocument,
		options
	)
}
export type GetIntegrationsQueryHookResult = ReturnType<typeof useGetIntegrationsQuery>
export type GetIntegrationsLazyQueryHookResult = ReturnType<typeof useGetIntegrationsLazyQuery>
export type GetIntegrationsSuspenseQueryHookResult = ReturnType<typeof useGetIntegrationsSuspenseQuery>
export type GetIntegrationsQueryResult = Apollo.QueryResult<GetIntegrationsQuery, GetIntegrationsQueryVariables>
export const GetOrganizationsDocument = gql`
	query GetOrganizations {
		organizations {
			...OrganizationFragment
		}
	}
	${OrganizationFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
`

/**
 * __useGetOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationsQuery(
	baseOptions?: Apollo.QueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options)
}
export function useGetOrganizationsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options)
}
export function useGetOrganizationsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(
		GetOrganizationsDocument,
		options
	)
}
export type GetOrganizationsQueryHookResult = ReturnType<typeof useGetOrganizationsQuery>
export type GetOrganizationsLazyQueryHookResult = ReturnType<typeof useGetOrganizationsLazyQuery>
export type GetOrganizationsSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationsSuspenseQuery>
export type GetOrganizationsQueryResult = Apollo.QueryResult<GetOrganizationsQuery, GetOrganizationsQueryVariables>
export const GetOrganizationDocument = gql`
	query GetOrganization($id: ID!) {
		organization(id: $id) {
			...OrganizationFragment
		}
	}
	${OrganizationFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
`

/**
 * __useGetOrganizationQuery__
 *
 * To run a query within a React component, call `useGetOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationQuery(
	baseOptions: Apollo.QueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables> &
		({ variables: GetOrganizationQueryVariables; skip?: boolean } | { skip: boolean })
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options)
}
export function useGetOrganizationLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options)
}
export function useGetOrganizationSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(
		GetOrganizationDocument,
		options
	)
}
export type GetOrganizationQueryHookResult = ReturnType<typeof useGetOrganizationQuery>
export type GetOrganizationLazyQueryHookResult = ReturnType<typeof useGetOrganizationLazyQuery>
export type GetOrganizationSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationSuspenseQuery>
export type GetOrganizationQueryResult = Apollo.QueryResult<GetOrganizationQuery, GetOrganizationQueryVariables>
export const CreateOrganizationDocument = gql`
	mutation CreateOrganization($input: OrganizationCreateInput!) {
		createOrganization(input: $input) {
			...OrganizationFragment
		}
	}
	${OrganizationFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
`
export type CreateOrganizationMutationFn = Apollo.MutationFunction<
	CreateOrganizationMutation,
	CreateOrganizationMutationVariables
>

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(
		CreateOrganizationDocument,
		options
	)
}
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<
	CreateOrganizationMutation,
	CreateOrganizationMutationVariables
>
export const GetMembersDocument = gql`
	query GetMembers($organizationId: ID!) {
		organization(id: $organizationId) {
			users {
				...UserBaseFragment
			}
		}
	}
	${UserBaseFragmentFragmentDoc}
`

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetMembersQuery(
	baseOptions: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables> &
		({ variables: GetMembersQueryVariables; skip?: boolean } | { skip: boolean })
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export function useGetMembersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export function useGetMembersSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>
export type GetMembersSuspenseQueryHookResult = ReturnType<typeof useGetMembersSuspenseQuery>
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>
export const CreateMemberDocument = gql`
	mutation CreateMember($input: UserCreate!) {
		userCreate(input: $input) {
			...UserBaseFragment
		}
	}
	${UserBaseFragmentFragmentDoc}
`
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMemberMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options)
}
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<
	CreateMemberMutation,
	CreateMemberMutationVariables
>
export const GetPaymentMethodsDocument = gql`
	query GetPaymentMethods {
		paymentMethods {
			...PaymentMethodBaseFragment
		}
	}
	${PaymentMethodBaseFragmentFragmentDoc}
`

/**
 * __useGetPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useGetPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaymentMethodsQuery(
	baseOptions?: Apollo.QueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(GetPaymentMethodsDocument, options)
}
export function useGetPaymentMethodsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(
		GetPaymentMethodsDocument,
		options
	)
}
export function useGetPaymentMethodsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(
		GetPaymentMethodsDocument,
		options
	)
}
export type GetPaymentMethodsQueryHookResult = ReturnType<typeof useGetPaymentMethodsQuery>
export type GetPaymentMethodsLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodsLazyQuery>
export type GetPaymentMethodsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentMethodsSuspenseQuery>
export type GetPaymentMethodsQueryResult = Apollo.QueryResult<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>
export const CreateTransactionDocument = gql`
	mutation CreateTransaction($input: CreateTransactionInput!) {
		createTransaction(input: $input) {
			...TransactionFragment
		}
	}
	${TransactionFragmentFragmentDoc}
	${QrCodeBaseFragmentFragmentDoc}
`
export type CreateTransactionMutationFn = Apollo.MutationFunction<
	CreateTransactionMutation,
	CreateTransactionMutationVariables
>

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransactionMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(
		CreateTransactionDocument,
		options
	)
}
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<
	CreateTransactionMutation,
	CreateTransactionMutationVariables
>
export const GetMeDocument = gql`
	query GetMe {
		authMe {
			...UserBaseFragment
			personalAreas {
				...PersonalAreaBaseFragment
			}
		}
	}
	${UserBaseFragmentFragmentDoc}
	${PersonalAreaBaseFragmentFragmentDoc}
	${SubscriptionFragmentFragmentDoc}
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
export const GetWorkspacesDocument = gql`
	query GetWorkspaces($page: Int, $count: Int) {
		workspaces(page: $page, count: $count) {
			...WorkspacePaginatedFragment
		}
	}
	${WorkspacePaginatedFragmentFragmentDoc}
	${WorkspaceFragmentFragmentDoc}
	${WorkspaceBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${UserBaseFragmentFragmentDoc}
	${PaginationFragmentFragmentDoc}
`

/**
 * __useGetWorkspacesQuery__
 *
 * To run a query within a React component, call `useGetWorkspacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspacesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      count: // value for 'count'
 *   },
 * });
 */
export function useGetWorkspacesQuery(
	baseOptions?: Apollo.QueryHookOptions<GetWorkspacesQuery, GetWorkspacesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, options)
}
export function useGetWorkspacesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspacesQuery, GetWorkspacesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, options)
}
export function useGetWorkspacesSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkspacesQuery, GetWorkspacesQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, options)
}
export type GetWorkspacesQueryHookResult = ReturnType<typeof useGetWorkspacesQuery>
export type GetWorkspacesLazyQueryHookResult = ReturnType<typeof useGetWorkspacesLazyQuery>
export type GetWorkspacesSuspenseQueryHookResult = ReturnType<typeof useGetWorkspacesSuspenseQuery>
export type GetWorkspacesQueryResult = Apollo.QueryResult<GetWorkspacesQuery, GetWorkspacesQueryVariables>
export const GetWorkspaceDocument = gql`
	query GetWorkspace($id: ID!) {
		workspace(id: $id) {
			...WorkspaceFragment
		}
	}
	${WorkspaceFragmentFragmentDoc}
	${WorkspaceBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${UserBaseFragmentFragmentDoc}
`

/**
 * __useGetWorkspaceQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkspaceQuery(
	baseOptions: Apollo.QueryHookOptions<GetWorkspaceQuery, GetWorkspaceQueryVariables> &
		({ variables: GetWorkspaceQueryVariables; skip?: boolean } | { skip: boolean })
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, options)
}
export function useGetWorkspaceLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceQuery, GetWorkspaceQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, options)
}
export function useGetWorkspaceSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkspaceQuery, GetWorkspaceQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetWorkspaceQuery, GetWorkspaceQueryVariables>(GetWorkspaceDocument, options)
}
export type GetWorkspaceQueryHookResult = ReturnType<typeof useGetWorkspaceQuery>
export type GetWorkspaceLazyQueryHookResult = ReturnType<typeof useGetWorkspaceLazyQuery>
export type GetWorkspaceSuspenseQueryHookResult = ReturnType<typeof useGetWorkspaceSuspenseQuery>
export type GetWorkspaceQueryResult = Apollo.QueryResult<GetWorkspaceQuery, GetWorkspaceQueryVariables>
export const CreateWorkspaceDocument = gql`
	mutation CreateWorkspace($input: WorkspaceCreateInput!) {
		createWorkspace(input: $input) {
			...WorkspaceFragment
		}
	}
	${WorkspaceFragmentFragmentDoc}
	${WorkspaceBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${UserBaseFragmentFragmentDoc}
`
export type CreateWorkspaceMutationFn = Apollo.MutationFunction<
	CreateWorkspaceMutation,
	CreateWorkspaceMutationVariables
>

/**
 * __useCreateWorkspaceMutation__
 *
 * To run a mutation, you first call `useCreateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkspaceMutation, { data, loading, error }] = useCreateWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkspaceMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(
		CreateWorkspaceDocument,
		options
	)
}
export type CreateWorkspaceMutationHookResult = ReturnType<typeof useCreateWorkspaceMutation>
export type CreateWorkspaceMutationResult = Apollo.MutationResult<CreateWorkspaceMutation>
export type CreateWorkspaceMutationOptions = Apollo.BaseMutationOptions<
	CreateWorkspaceMutation,
	CreateWorkspaceMutationVariables
>
export const AddUserToWorkspaceDocument = gql`
	mutation AddUserToWorkspace($input: AddUserWorkspaceInput!) {
		addUserWorkspace(input: $input) {
			...UserBaseFragment
		}
	}
	${UserBaseFragmentFragmentDoc}
`
export type AddUserToWorkspaceMutationFn = Apollo.MutationFunction<
	AddUserToWorkspaceMutation,
	AddUserToWorkspaceMutationVariables
>

/**
 * __useAddUserToWorkspaceMutation__
 *
 * To run a mutation, you first call `useAddUserToWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToWorkspaceMutation, { data, loading, error }] = useAddUserToWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserToWorkspaceMutation(
	baseOptions?: Apollo.MutationHookOptions<AddUserToWorkspaceMutation, AddUserToWorkspaceMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<AddUserToWorkspaceMutation, AddUserToWorkspaceMutationVariables>(
		AddUserToWorkspaceDocument,
		options
	)
}
export type AddUserToWorkspaceMutationHookResult = ReturnType<typeof useAddUserToWorkspaceMutation>
export type AddUserToWorkspaceMutationResult = Apollo.MutationResult<AddUserToWorkspaceMutation>
export type AddUserToWorkspaceMutationOptions = Apollo.BaseMutationOptions<
	AddUserToWorkspaceMutation,
	AddUserToWorkspaceMutationVariables
>
export const GetWorkspaceMembersDocument = gql`
	query GetWorkspaceMembers($workspaceId: ID!) {
		workspace(id: $workspaceId) {
			users {
				...UserBaseFragment
			}
		}
	}
	${UserBaseFragmentFragmentDoc}
`

/**
 * __useGetWorkspaceMembersQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceMembersQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetWorkspaceMembersQuery(
	baseOptions: Apollo.QueryHookOptions<GetWorkspaceMembersQuery, GetWorkspaceMembersQueryVariables> &
		({ variables: GetWorkspaceMembersQueryVariables; skip?: boolean } | { skip: boolean })
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetWorkspaceMembersQuery, GetWorkspaceMembersQueryVariables>(
		GetWorkspaceMembersDocument,
		options
	)
}
export function useGetWorkspaceMembersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceMembersQuery, GetWorkspaceMembersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetWorkspaceMembersQuery, GetWorkspaceMembersQueryVariables>(
		GetWorkspaceMembersDocument,
		options
	)
}
export function useGetWorkspaceMembersSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetWorkspaceMembersQuery, GetWorkspaceMembersQueryVariables>
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<GetWorkspaceMembersQuery, GetWorkspaceMembersQueryVariables>(
		GetWorkspaceMembersDocument,
		options
	)
}
export type GetWorkspaceMembersQueryHookResult = ReturnType<typeof useGetWorkspaceMembersQuery>
export type GetWorkspaceMembersLazyQueryHookResult = ReturnType<typeof useGetWorkspaceMembersLazyQuery>
export type GetWorkspaceMembersSuspenseQueryHookResult = ReturnType<typeof useGetWorkspaceMembersSuspenseQuery>
export type GetWorkspaceMembersQueryResult = Apollo.QueryResult<
	GetWorkspaceMembersQuery,
	GetWorkspaceMembersQueryVariables
>
export const RemoveUserFromWorkspaceDocument = gql`
	mutation RemoveUserFromWorkspace($input: DeleteUserWorkspaceInput!) {
		deleteUserWorkspace(input: $input) {
			status
		}
	}
`
export type RemoveUserFromWorkspaceMutationFn = Apollo.MutationFunction<
	RemoveUserFromWorkspaceMutation,
	RemoveUserFromWorkspaceMutationVariables
>

/**
 * __useRemoveUserFromWorkspaceMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromWorkspaceMutation, { data, loading, error }] = useRemoveUserFromWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserFromWorkspaceMutation(
	baseOptions?: Apollo.MutationHookOptions<RemoveUserFromWorkspaceMutation, RemoveUserFromWorkspaceMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<RemoveUserFromWorkspaceMutation, RemoveUserFromWorkspaceMutationVariables>(
		RemoveUserFromWorkspaceDocument,
		options
	)
}
export type RemoveUserFromWorkspaceMutationHookResult = ReturnType<typeof useRemoveUserFromWorkspaceMutation>
export type RemoveUserFromWorkspaceMutationResult = Apollo.MutationResult<RemoveUserFromWorkspaceMutation>
export type RemoveUserFromWorkspaceMutationOptions = Apollo.BaseMutationOptions<
	RemoveUserFromWorkspaceMutation,
	RemoveUserFromWorkspaceMutationVariables
>
export const SetWorkUserWorkspaceDocument = gql`
	mutation SetWorkUserWorkspace($input: SetWorkUserWorkspaceInput!) {
		setWorkUserWorkspace(input: $input) {
			...UserBaseFragment
		}
	}
	${UserBaseFragmentFragmentDoc}
`
export type SetWorkUserWorkspaceMutationFn = Apollo.MutationFunction<
	SetWorkUserWorkspaceMutation,
	SetWorkUserWorkspaceMutationVariables
>

/**
 * __useSetWorkUserWorkspaceMutation__
 *
 * To run a mutation, you first call `useSetWorkUserWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetWorkUserWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setWorkUserWorkspaceMutation, { data, loading, error }] = useSetWorkUserWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetWorkUserWorkspaceMutation(
	baseOptions?: Apollo.MutationHookOptions<SetWorkUserWorkspaceMutation, SetWorkUserWorkspaceMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<SetWorkUserWorkspaceMutation, SetWorkUserWorkspaceMutationVariables>(
		SetWorkUserWorkspaceDocument,
		options
	)
}
export type SetWorkUserWorkspaceMutationHookResult = ReturnType<typeof useSetWorkUserWorkspaceMutation>
export type SetWorkUserWorkspaceMutationResult = Apollo.MutationResult<SetWorkUserWorkspaceMutation>
export type SetWorkUserWorkspaceMutationOptions = Apollo.BaseMutationOptions<
	SetWorkUserWorkspaceMutation,
	SetWorkUserWorkspaceMutationVariables
>
export const AddPaymentMethodToWorkspaceDocument = gql`
	mutation AddPaymentMethodToWorkspace($input: AddPaymentWorkspaceInput!) {
		addPaymentWorkspace(input: $input) {
			...WorkspaceFragment
		}
	}
	${WorkspaceFragmentFragmentDoc}
	${WorkspaceBaseFragmentFragmentDoc}
	${PaymentMethodBaseFragmentFragmentDoc}
	${OrganizationBaseFragmentFragmentDoc}
	${UserBaseFragmentFragmentDoc}
`
export type AddPaymentMethodToWorkspaceMutationFn = Apollo.MutationFunction<
	AddPaymentMethodToWorkspaceMutation,
	AddPaymentMethodToWorkspaceMutationVariables
>

/**
 * __useAddPaymentMethodToWorkspaceMutation__
 *
 * To run a mutation, you first call `useAddPaymentMethodToWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMethodToWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMethodToWorkspaceMutation, { data, loading, error }] = useAddPaymentMethodToWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPaymentMethodToWorkspaceMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddPaymentMethodToWorkspaceMutation,
		AddPaymentMethodToWorkspaceMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<AddPaymentMethodToWorkspaceMutation, AddPaymentMethodToWorkspaceMutationVariables>(
		AddPaymentMethodToWorkspaceDocument,
		options
	)
}
export type AddPaymentMethodToWorkspaceMutationHookResult = ReturnType<typeof useAddPaymentMethodToWorkspaceMutation>
export type AddPaymentMethodToWorkspaceMutationResult = Apollo.MutationResult<AddPaymentMethodToWorkspaceMutation>
export type AddPaymentMethodToWorkspaceMutationOptions = Apollo.BaseMutationOptions<
	AddPaymentMethodToWorkspaceMutation,
	AddPaymentMethodToWorkspaceMutationVariables
>
export const LoginDocument = gql`
	mutation login($input: UserLoginInput!) {
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
export const RegisterDocument = gql`
	mutation register($input: UserRegistration!) {
		registration(input: $input) {
			access_token
		}
	}
`
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
	baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>
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
