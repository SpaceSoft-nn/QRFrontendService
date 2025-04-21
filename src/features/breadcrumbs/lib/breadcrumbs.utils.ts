import { urlLabels, urls } from '@/shared/config'

const createPathToKeyMap = () => {
	const map: Record<string, string> = {}

	const processUrls = (obj: any, prefix = '') => {
		for (const key in obj) {
			if (typeof obj[key] === 'string') {
				map[obj[key]] = prefix ? `${prefix}.${key}` : key
			} else if (typeof obj[key] === 'object') {
				processUrls(obj[key], prefix ? `${prefix}.${key}` : key)
			}
		}
	}

	processUrls(urls)
	return map
}

// Map соответствия путей и ключей
const pathToKeyMap = createPathToKeyMap()

// Получение названия пути
export const getPathLabel = (path: string): string => {
	// Проверяем, существует ли путь в нашей карте путей
	if (path in pathToKeyMap) {
		const keyPath = pathToKeyMap[path]

		const keyParts = keyPath.split('.')

		const lastKeyPart = keyParts[keyParts.length - 1]

		if (lastKeyPart in urlLabels) {
			return urlLabels[lastKeyPart as keyof typeof urlLabels]
		}
	}

	// Если путь не найден в карте, проверяем, является ли он корневым путем
	if (path === '/') {
		return 'Главная'
	}

	// Для неопределенных маршрутов возвращаем "Неизвестная страница"
	return 'Неизвестная страница'
}

// Получение всех путей из объекта urls
export const getAllPaths = (): string[] => {
	const allPaths: string[] = []

	const extractPaths = (obj: any) => {
		for (const key in obj) {
			if (typeof obj[key] === 'string') {
				allPaths.push(obj[key])
			} else if (typeof obj[key] === 'object') {
				extractPaths(obj[key])
			}
		}
	}

	extractPaths(urls)
	return allPaths
}

// Получение родительских путей из urls
export const getParentPaths = (currentPath: string): string[] => {
	if (currentPath === '/') return []

	const allPaths = getAllPaths()

	if (!allPaths.includes('/')) {
		allPaths.push('/')
	}

	allPaths.sort((a, b) => a.length - b.length)

	const parentPaths: string[] = []

	if (currentPath !== '/') {
		parentPaths.push('/')
	}

	for (const path of allPaths) {
		if (path === '/' || path === currentPath) continue

		// Проверяем, является ли путь родительским для текущего
		// Путь является родительским, если:
		// 1. Текущий путь начинается с этого пути + '/'
		// 2. Или это точный путь из urls (для маршрутов без дочерних элементов)
		if (currentPath.startsWith(path + '/') || (allPaths.includes(path) && currentPath.startsWith(path))) {
			parentPaths.push(path)
		}
	}

	if (allPaths.includes(currentPath)) {
		parentPaths.push(currentPath)
	}

	return parentPaths
}
