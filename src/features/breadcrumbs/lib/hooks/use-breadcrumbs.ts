import { useContext } from 'react'
import { BreadcrumbsContext } from '../breadcrumbs.context'

export function useBreadcrumbs() {
	const context = useContext(BreadcrumbsContext)
	if (context === undefined) {
		throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider')
	}
	return context
}
