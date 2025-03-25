import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from 'lucide-react'
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui'
import { urls } from '@/shared/config'

export const NotFoundPage = () => {
	return (
		<div className='flex h-svh items-center justify-center'>
			<Card className='max-w-md mx-auto'>
				<CardHeader>
					<CardTitle className='text-6xl font-bold text-center'>404</CardTitle>
					<CardDescription>
						Извините, но страница, которую вы ищете, не существует или была перемещена.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button asChild className='w-full'>
						<Link to={urls.dashboard.main}>
							<ExternalLinkIcon className='h-4 w-4' />
							Вернуться на главную
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
