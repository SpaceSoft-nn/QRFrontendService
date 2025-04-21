import s from '../styles/Forms.module.scss'

export const FormErrorMessage: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <p className={s.formField__error}>{children}</p>
}
