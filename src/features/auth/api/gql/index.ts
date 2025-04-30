import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
	mutation login($input: UserLoginInput!) {
		login(input: $input) {
			access_token
		}
	}
`

export const REGISTER_MUTATION = gql`
	mutation register($input: UserRegistration!) {
		registration(input: $input) {
			access_token
		}
	}
`

export const LOGOUT_MUTATION = gql`
	mutation AuthLogout {
		authLogout
	}
`

export const REFRESH_MUTATION = gql`
	mutation AuthRefreshToken {
		authRefresh {
			access_token
		}
	}
`

export const SUBSCRIPTION_FRAGMENT = gql`
	fragment SubscriptionInfo on SubscriptionPlan {
		plan_name
		price
		expires_at
		created_at
	}
`

export const PERSONAL_AREA_FRAGMENT = gql`
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
