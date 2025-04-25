import { Card, CardDescription, CardHeader, CardTitle } from '../card'

interface NotFoundProps {
	title: string
}

export const NotFound = ({ title }: NotFoundProps) => {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='max-w-sm mx-auto border-none'>
				<CardHeader>
					<CardTitle className='text-6xl font-bold text-center text-primary'>404</CardTitle>
					<CardDescription className='text-center'>{title}</CardDescription>
				</CardHeader>
			</Card>
		</div>
	)
}
