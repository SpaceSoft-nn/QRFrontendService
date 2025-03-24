import { ThemeToggleButton } from '@/features/theme-toggle'
import { SidebarTrigger } from '@/shared/ui/sidebar'
import s from './Header.module.scss'

export const Header: React.FC = () => {
	return (
		<header className={s.header}>
			<SidebarTrigger />
			<div className='flex items-center gap-2'>
				<ThemeToggleButton />
			</div>
		</header>
	)
}
