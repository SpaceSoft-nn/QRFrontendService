import { gql } from '@apollo/client'
import { ORGANIZATION_FRAGMENT } from '@/shared/api'

export const GET_ORGANIZATIONS_QUERY = gql`
	query GetOrganizations {
		organizations {
			...OrganizationFragment
		}
	}
	${ORGANIZATION_FRAGMENT}
`

export const GET_ORGANIZATION_QUERY = gql`
	query GetOrganization($id: ID!) {
		organization(id: $id) {
			...OrganizationFragment
		}
	}
	${ORGANIZATION_FRAGMENT}
`

export const CREATE_ORGANIZATION_MUTATION = gql`
	mutation CreateOrganization($input: OrganizationCreateInput!) {
		createOrganization(input: $input) {
			...OrganizationFragment
		}
	}
	${ORGANIZATION_FRAGMENT}
`
