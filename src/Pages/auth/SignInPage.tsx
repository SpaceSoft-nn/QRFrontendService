import { motion } from 'framer-motion'
import { SignInForm } from '@/features/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

export const SignInPage = () => {
	return (
		<div className='flex h-screen items-center justify-center'>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-xs'
			>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl text-center'>Вход</CardTitle>
					</CardHeader>
					<CardContent>
						<SignInForm />
					</CardContent>
				</Card>
			</motion.div>
		</div>
	)
}
