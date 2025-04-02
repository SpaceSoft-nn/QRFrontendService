import { ThemeToggleButton } from '@/features/theme-toggle'
import { Separator, TextGenerateEffect } from '@/shared/ui'
import { SidebarTrigger } from '@/shared/ui/sidebar'

export const Header: React.FC = () => {
	return (
		<header className='flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
			<div className='flex items-center gap-2 w-full px-4'>
				<SidebarTrigger />
				<Separator orientation='vertical' className='h-4' />
				<TextGenerateEffect text='QR Prosto' className='font-semibold' />
				<ThemeToggleButton className='ml-auto' />
			</div>
		</header>
	)
}
