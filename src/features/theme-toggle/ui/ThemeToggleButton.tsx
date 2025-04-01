import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/app/hooks/use-theme'
import { Button } from '@/shared/ui'

export const ThemeToggleButton: React.FC<{
	className?: string
}> = ({ className }) => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			variant='ghost'
			size='icon'
			className={className}
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			icon={theme === 'light' ? Moon : Sun}
			tooltip={theme === 'light' ? 'Светлая тема' : 'Темная тема'}
		/>
	)
}
