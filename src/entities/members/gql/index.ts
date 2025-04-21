import { gql } from '@apollo/client'
import { USER_BASE_FRAGMENT } from '@/shared/api'

export const GET_MEMBERS_QUERY = gql`
	query GetMembers($organizationId: ID!) {
		organization(id: $organizationId) {
			users {
				...UserBaseFragment
			}
		}
	}
	${USER_BASE_FRAGMENT}
`

export const CREATE_MEMBER_MUTATION = gql`
	mutation CreateMember($input: UserCreate!) {
		userCreate(input: $input) {
			...UserBaseFragment
		}
	}
	${USER_BASE_FRAGMENT}
`
