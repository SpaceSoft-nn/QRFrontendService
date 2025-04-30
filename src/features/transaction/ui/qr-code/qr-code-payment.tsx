import { RussianRubleIcon } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { Button, DataItem, Image } from '@/shared/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Transaction } from '@/shared/api/graphql'

interface QrCodePaymentProps {
	transaction: Transaction | null
}

export const QrCodePayment = observer<QrCodePaymentProps>(({ transaction }) => {
	if (!transaction) return null

	return (
		<Card className='w-fit'>
			<CardHeader>
				<CardTitle>Оплата</CardTitle>
				<CardDescription>Сканируйте QR-код для оплаты</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 items-center'>
				<Image
					src={
						'https://api.ust.kz/storage/files/materials/docx/image/2021/february/d26/1614355077_html_c2a765adeec0a9fd.png'
					}
					className='aspect-square max-w-[200px] max-h-[200px]'
					alt={`QR-код для оплаты ${transaction.amount} руб.`}
					fallbackText={`Не удалось загрузить QR-код`}
					onError={() => {
						console.error('Ошибка загрузки QR-кода:', transaction?.qr_code.qr_url)
					}}
				/>
			</CardContent>
		</Card>
	)
})
