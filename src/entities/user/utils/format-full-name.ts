import { User } from '@/shared/api/graphql'

interface FormatFullNameOptions {
	withFatherName?: boolean
	initials?: boolean
}

export const formatFullName = (user: User, options?: FormatFullNameOptions) => {
	const { withFatherName = true, initials = false } = options || {}
	const { last_name, first_name, father_name } = user

	if (!last_name || !first_name || !father_name) return 'Неизвестный пользователь'

	if (initials) {
		return `${last_name} ${first_name?.charAt(0)}. ${withFatherName ? `${father_name?.charAt(0)}.` : ''}`
	}

	return `${last_name} ${first_name} ${withFatherName ? father_name : ''}`
}
