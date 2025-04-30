import { PartySuggestionsProps, PartySuggestionsValue } from '@/entities/organization'
import { BaseFormFieldProps } from '@/shared/ui/Forms'

export interface OrganizationSuggestionsProps
	extends Omit<BaseFormFieldProps, 'onChange' | 'type' | 'value' | 'defaultValue'>,
		PartySuggestionsProps {
	value?: PartySuggestionsValue
	onChange?: (suggestion: PartySuggestionsValue) => void
	disabled?: boolean
}
