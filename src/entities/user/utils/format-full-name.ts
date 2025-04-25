import { User } from '@/shared/api/graphql'

interface FormatFullNameOptions {
	withFatherName?: boolean
	initials?: boolean
}

export const formatFullName = (user: User, options?: FormatFullNameOptions) => {
	const { withFatherName = true, initials = false } = options || {}

	if (initials) {
		return `${user.last_name} ${user.first_name?.charAt(0)}. ${withFatherName ? `${user.father_name?.charAt(0)}.` : ''}`
	}

	return `${user.last_name} ${user.first_name} ${withFatherName ? user.father_name : ''}`
}
