import { transliterate } from './transliterate'

const slugCache = new Map<string, string>()

/**
 * Преобразует строку в slug-формат, использует кэш
 * @param text Исходная строка
 * @returns Строка в формате slug
 */
export const slugify = (text: string): string => {
	if (slugCache.has(text)) {
		return slugCache.get(text)!
	}

	const transliteratedText = transliterate(text)
	const result = transliteratedText
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')

	slugCache.set(text, result)
	return result
}
