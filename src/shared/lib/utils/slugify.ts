/**
 * Преобразует строку в slug-формат
 * @param text Исходная строка
 * @returns Строка в формате slug
 */
export const slugify = (text: string): string => {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}
