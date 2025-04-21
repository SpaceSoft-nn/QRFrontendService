import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDateTime = (date: string) => {
	return format(new Date(date), 'dd MMMM в HH:mm', { locale: ru })
}

/**
 * Форматирует дату из миллисекунд в формат dd.mm.yyyy
 * @param timestamp Дата в миллисекундах
 * @returns Отформатированная дата в формате dd.mm.yyyy
 */
export const formatDateFromTimestamp = (timestamp: number): string => {
	return format(new Date(timestamp), 'dd.MM.yyyy', { locale: ru })
}
