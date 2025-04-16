import { Organization } from '@/shared/api/graphql'

export interface OrganizationWithOpf extends Organization {
	nameWithOpf: string
}
