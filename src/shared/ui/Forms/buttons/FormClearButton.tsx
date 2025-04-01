import { X } from 'lucide-react'

interface FormClearButtonProps {
	onClick: VoidFunction
}

export const FormClearButton: React.FC<FormClearButtonProps> = ({ onClick }) => {
	return (
		<button onClick={onClick} tabIndex={-1}>
			<X />
		</button>
	)
}
