type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface TitleUiProps {
	size?: TitleSize
	className?: string
	text: string
}

export const mapTagBySize = {
	xs: 'h5',
	sm: 'h4',
	md: 'h3',
	lg: 'h2',
	xl: 'h1',
	'2xl': 'h1'
} as const

export const mapClassNameBySize = {
	xs: 'text-[16px] font-semibold',
	sm: 'text-[22px] font-semibold',
	md: 'text-[26px]',
	lg: 'text-[32px]',
	xl: 'text-[40px]',
	'2xl': 'text-[48px]'
} as const

export type { TitleSize, TitleUiProps }
