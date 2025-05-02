import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Image } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Transaction } from '@/shared/api/graphql'
import { formatCurrency, getBase64ImageUrl } from '@/shared/lib'

interface QrCodePaymentProps {
	transaction: Transaction
}

export const QrCodePayment = observer<QrCodePaymentProps>(({ transaction }) => {
	const qrCodeImage = getBase64ImageUrl(transaction.qr_code.content_image_base64)

	return (
		<Card className='w-fit'>
			<CardHeader>
				<CardTitle>
					<span>Оплата на сумму</span>{' '}
					<span className='text-primary'>{formatCurrency(transaction.amount)}</span>
				</CardTitle>

				<CardDescription>
					Сканируйте QR-код или перейдите по{' '}
					<Link to={transaction.qr_code.qr_url} className='text-primary'>
						ссылке
					</Link>
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 items-center'>
				<Image
					draggable={false}
					src={qrCodeImage}
					className='aspect-square rounded-lg'
					alt={`QR-код для оплаты ${transaction.amount} руб.`}
					fallbackText={`Не удалось загрузить QR-код`}
					onError={() => {
						console.log('Ошибка загрузки QR-кода:')
					}}
				/>
			</CardContent>
		</Card>
	)
})
