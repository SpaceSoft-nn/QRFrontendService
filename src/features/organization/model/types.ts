import { PartySuggestions } from 'react-dadata'
import { BaseFormFieldProps } from '@/shared/ui/Forms'

type PartySuggestionsProps = Omit<React.ComponentProps<typeof PartySuggestions>, 'token' | 'count' | 'delay'>
type PartySuggestionsValue = PartySuggestionsProps['value']

interface OrganizationSuggestionsProps
	extends Omit<BaseFormFieldProps, 'onChange' | 'type' | 'value' | 'defaultValue'>,
		PartySuggestionsProps {
	value?: PartySuggestionsValue
	onChange?: (suggestion: PartySuggestionsValue) => void
	disabled?: boolean
}

export type { OrganizationSuggestionsProps, PartySuggestionsProps, PartySuggestionsValue }
