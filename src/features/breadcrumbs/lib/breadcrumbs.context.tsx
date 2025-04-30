import React, { createContext, useCallback, useState } from 'react'

interface BreadcrumbsContextType {
	dynamicLabels: Record<string, string>
	setDynamicLabel: (path: string, label: string) => void
}

export const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined)

export function BreadcrumbsProvider({ children }: { children: React.ReactNode }) {
	const [dynamicLabels, setDynamicLabels] = useState<Record<string, string>>({})

	const setDynamicLabel = useCallback((path: string, label: string) => {
		setDynamicLabels(prev => ({
			...prev,
			[path]: label
		}))
	}, [])

	return (
		<BreadcrumbsContext.Provider value={{ dynamicLabels, setDynamicLabel }}>{children}</BreadcrumbsContext.Provider>
	)
}
