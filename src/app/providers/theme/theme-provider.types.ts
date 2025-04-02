export type AppTheme = 'dark' | 'light' | 'system'

export type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: AppTheme
	storageKey?: string
}

export type ThemeProviderState = {
	theme: AppTheme
	setTheme: (theme: AppTheme) => void
}
