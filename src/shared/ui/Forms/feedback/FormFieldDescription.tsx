import s from '../styles/Forms.module.scss'

export const FormFieldDescription = ({ children }: { children: React.ReactNode }) => {
	return <p className={s.formField__description}>{children}</p>
}
