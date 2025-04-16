import React from 'react'
import { cn } from '@/shared/lib/utils/tw-merge'
import { mapClassNameBySize, mapTagBySize, TitleUiProps } from './TitleUi.types'

export const TitleUi: React.FC<TitleUiProps> = ({ size = 'md', className, text }) => {
	return React.createElement(
		mapTagBySize[size],
		{ className: cn('font-bold', mapClassNameBySize[size], className) },
		text
	)
}
