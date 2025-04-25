import { SelectItem } from '@/shared/ui/Forms'

export const commandFilter = (items: SelectItem[]) => (value: string, search: string) => {
	if (!search) return 1
	const item = items.find(item => item.value === value)
	if (!item) return 0
	const searchLower = search.toLowerCase()
	return item.label.toLowerCase().includes(searchLower) ||
		(item.description && item.description.toLowerCase().includes(searchLower))
		? 1
		: 0
}
