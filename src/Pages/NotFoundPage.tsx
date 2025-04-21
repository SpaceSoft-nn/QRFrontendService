import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from 'lucide-react'
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui'
import { urls } from '@/shared/config'

export const NotFoundPage = ({ withButton = true }: { withButton?: boolean }) => {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='max-w-sm mx-auto border-none'>
				<CardHeader>
					<CardTitle className='text-6xl font-bold text-center'>404</CardTitle>
					<CardDescription className='text-center'>
						Извините, но страница, которую вы ищете, не существует или была перемещена.
					</CardDescription>
				</CardHeader>
				<CardFooter className='flex justify-center'>
					{withButton && (
						<Link to={urls.dashboard.main}>
							<Button icon={ExternalLinkIcon}>Вернуться на главную</Button>
						</Link>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
