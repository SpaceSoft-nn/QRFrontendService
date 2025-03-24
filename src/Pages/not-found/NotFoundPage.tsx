import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import s from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
	const navigate = useNavigate()

	return (
		<div className={s.container}>
			<div className={s.content}>
				<h1 className={s.title}>404</h1>
				<h2 className={s.subtitle}>Страница не найдена</h2>
				<p className={s.description}>
					Извините, но страница, которую вы ищете, не существует или была перемещена.
				</p>
				<Button onClick={() => navigate('/')} variant='default'>
					Вернуться на главную
				</Button>
			</div>
		</div>
	)
}
