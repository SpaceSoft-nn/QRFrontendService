import { gql } from '@apollo/client'

export const PAGINATION_FRAGMENT = gql`
	fragment PaginationFragment on PaginatorInfo {
		limit
		currentPage
		total
		totalPages
	}
`

export const ORGANIZATION_BASE_FRAGMENT = gql`
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

export const USER_BASE_FRAGMENT = gql`
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

export const PAYMENT_METHOD_BASE_FRAGMENT = gql`
	fragment PaymentMethodBaseFragment on PaymentMethod {
		id
		active
		driver_name
		created_at
	}
`

export const WORKSPACE_BASE_FRAGMENT = gql`
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
	${PAYMENT_METHOD_BASE_FRAGMENT}
`

export const SUBSCRIPTION_FRAGMENT = gql`
	fragment SubscriptionFragment on SubscriptionPlan {
		id
		plan_name
		price
		expires_at
	}
`

export const PERSONAL_AREA_BASE_FRAGMENT = gql`
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
	${USER_BASE_FRAGMENT}
	${SUBSCRIPTION_FRAGMENT}
`

export const ORGANIZATION_FRAGMENT = gql`
	fragment OrganizationFragment on Organization {
		...OrganizationBaseFragment
	}
	${ORGANIZATION_BASE_FRAGMENT}
`

export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		...UserBaseFragment
		workspaces {
			...WorkspaceBaseFragment
		}
		organizations {
			...OrganizationBaseFragment
		}
	}
	${USER_BASE_FRAGMENT}
	${WORKSPACE_BASE_FRAGMENT}
	${ORGANIZATION_BASE_FRAGMENT}
`

export const WORKSPACE_FRAGMENT = gql`
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
	${WORKSPACE_BASE_FRAGMENT}
	${ORGANIZATION_BASE_FRAGMENT}
	${USER_BASE_FRAGMENT}
`

export const WORKSPACE_PAGINATED_FRAGMENT = gql`
	fragment WorkspacePaginatedFragment on WorkspacePaginator {
		data {
			...WorkspaceFragment
		}
		paginatorInfo {
			...PaginationFragment
		}
	}
	${WORKSPACE_FRAGMENT}
	${PAGINATION_FRAGMENT}
`

export const TRANSACTION_FRAGMENT = gql`
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
			qr_url
		}
		created_at
	}
`
