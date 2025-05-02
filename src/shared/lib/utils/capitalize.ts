interface FullNameInput {
	first_name: string
	last_name: string
	father_name?: string
}

export const capitalize = (string?: string) => {
	if (!string) return ''
	return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase()
}

/**
 * Капитализирует ФИО пользователя
 */
export const capitalizeFullName = (input: FullNameInput): FullNameInput => {
	return {
		first_name: capitalize(input.first_name),
		last_name: capitalize(input.last_name),
		father_name: capitalize(input.father_name)
	}
}
