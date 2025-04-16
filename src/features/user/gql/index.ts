import { gql } from '@apollo/client'
import { USER_FRAGMENT } from '@/shared/api/fragments'

export const GET_CURRENT_USER = gql`
	query GetMe {
		authMe {
			...UserFragment
		}
	}
	${USER_FRAGMENT}
`
