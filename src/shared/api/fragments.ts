import { gql } from '@apollo/client'

// Базовые фрагменты
export const ORGANIZATION_BASE_FRAGMENT = gql`
	fragment OrganizationBaseFragment on Organization {
		id
		name
		address
		type
		okved
		founded_date
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

export const WORKSPACE_BASE_FRAGMENT = gql`
	fragment WorkspaceBaseFragment on Workspace {
		id
		name
		description
		is_active
		created_at
	}
`

// Составные фрагменты
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
