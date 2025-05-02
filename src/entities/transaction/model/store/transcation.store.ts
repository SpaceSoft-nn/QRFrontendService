import { makeAutoObservable, runInAction } from 'mobx'
import { CreateTransactionInput, QrTypeEnum, Transaction } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'
import { transactionApi } from '../../api/transaction.api'

class TransactionStore {
	transactions: Transaction[] = []
	lastTransaction: Transaction | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	createTransaction = async (input: CreateTransactionInput) => {
		try {
			this.loading = true
			this.error = null

			const response = await transactionApi.createTransaction({
				...input,
				qr_type: QrTypeEnum.Static
			})

			runInAction(() => {
				if (response) {
					this.lastTransaction = response
					this.transactions.push(this.lastTransaction)
				}
			})

			return response
		} catch (error) {
			console.error('[createTransaction] error: ', error)
			this.error = error instanceof Error ? error.message : 'Произошла ошибка при создании транзакции'
			toast({
				title: 'Ошибка',
				variant: 'destructive',
				description: this.error
			})
			return null
		} finally {
			this.loading = false
		}
	}
}

export const transactionStore = new TransactionStore()
