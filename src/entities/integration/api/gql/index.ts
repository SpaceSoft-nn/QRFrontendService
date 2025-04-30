import { gql } from '@apollo/client'
import { DRIVER_INFO_FRAGMENT } from '@/shared/api/fragments'

export const CREATE_INTEGRATION_MUTATION = gql`
	mutation createDriverInfo($input: DriverInfoInput!) {
		createDriverInfo(input: $input) {
			...DriverInfoFragment
		}
	}
	${DRIVER_INFO_FRAGMENT}
`

export const GET_INTEGRATION_QUERY = gql`
	query getIntegration($id: ID!) {
		driverInfoById(id: $id) {
			...DriverInfoFragment
		}
	}
	${DRIVER_INFO_FRAGMENT}
`

export const GET_INTEGRATIONS_QUERY = gql`
	query getIntegrations {
		driverInfosByUser {
			...DriverInfoFragment
		}
	}
	${DRIVER_INFO_FRAGMENT}
`
