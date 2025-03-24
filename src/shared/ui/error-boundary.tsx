import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null
	}

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo)
	}

	public render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className='flex min-h-[400px] flex-col items-center justify-center gap-4 p-4 text-center'>
						<Card>
							<CardHeader>
								<div className='flex items-center space-x-2'>
									<AlertCircle className='h-4 w-4 text-destructive' />
									<CardTitle className='text-lg'>Что-то пошло не так</CardTitle>
								</div>
								<CardDescription>{this.state.error?.message || 'Произошла ошибка'}</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button
									className='w-full'
									onClick={() => this.setState({ hasError: false, error: null })}
								>
									<RefreshCcw className='h-4 w-4' />
									Попробовать снова
								</Button>
							</CardFooter>
						</Card>
					</div>
				)
			)
		}

		return this.props.children
	}
}
