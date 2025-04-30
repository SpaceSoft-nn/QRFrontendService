import { gql } from '@apollo/client'
import { PERSONAL_AREA_BASE_FRAGMENT, USER_BASE_FRAGMENT } from '@/shared/api/fragments'

export const GET_CURRENT_USER = gql`
	query GetMe {
		authMe {
			...UserBaseFragment
			personalAreas {
				...PersonalAreaBaseFragment
			}
		}
	}
	${USER_BASE_FRAGMENT}
	${PERSONAL_AREA_BASE_FRAGMENT}
`
