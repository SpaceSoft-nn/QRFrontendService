import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/shared/ui'
import { getParentPaths, getPathLabel } from '../lib/breadcrumbs.utils'

interface BreadcrumbPath {
	name: string
	path: string
	isCurrentPage: boolean
}

export function Breadcrumbs() {
	const location = useLocation()
	const currentPath = location.pathname

	const breadcrumbPaths = React.useMemo(() => {
		const paths: BreadcrumbPath[] = []

		// Получаем все родительские пути, включая корневой и текущий
		const parentPaths = getParentPaths(currentPath)

		// Добавляем все родительские пути
		parentPaths.forEach((path, index) => {
			const isLast = index === parentPaths.length - 1

			paths.push({
				name: getPathLabel(path),
				path,
				isCurrentPage: isLast && path === currentPath
			})
		})

		// Если текущий путь не был добавлен (например, он не существует в urls)
		if (!paths.some(p => p.path === currentPath)) {
			paths.push({
				name: getPathLabel(currentPath),
				path: currentPath,
				isCurrentPage: true
			})
		}

		// Удаляем дубликаты и сортируем по длине пути
		return Array.from(new Map(paths.map(item => [item.path, item])).values()).sort(
			(a, b) => a.path.split('/').length - b.path.split('/').length
		)
	}, [currentPath])

	// Если нет хлебных крошек или только одна (главная), не показываем
	if (breadcrumbPaths.length <= 1) {
		return null
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbPaths.map((item, index) => (
					<React.Fragment key={item.path}>
						<BreadcrumbItem>
							{item.isCurrentPage ? (
								<BreadcrumbPage>{item.name}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link to={item.path}>{item.name}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < breadcrumbPaths.length - 1 && (
							<BreadcrumbSeparator>
								<ChevronRight className='h-4 w-4' />
							</BreadcrumbSeparator>
						)}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
