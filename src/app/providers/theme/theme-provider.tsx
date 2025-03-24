import { createContext, useEffect, useState } from 'react'
import { AppTheme, ThemeProviderProps, ThemeProviderState } from './theme-provider.types'

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<AppTheme>(() => (localStorage.getItem(storageKey) as AppTheme) || defaultTheme)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	const value = {
		theme,
		setTheme: (theme: AppTheme) => {
			localStorage.setItem(storageKey, theme)
			setTheme(theme)
		}
	}

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	)
}
