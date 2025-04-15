import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui'
import { Button } from '@/shared/ui/button'

interface AuthWrapperProps {
	children: React.ReactNode
	title: string
	redirectTo: string
	redirectText: string
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, title, redirectTo, redirectText }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='w-full max-w-sm'
		>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl text-center'>{title}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className='!pt-3'>
					<Link to={redirectTo} className='w-full'>
						<Button variant='outline' className='w-full text-sm text-muted-foreground'>
							{redirectText}
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</motion.div>
	)
}
