import { makeAutoObservable, runInAction } from 'mobx'
import { CREATE_TRANSCATION_MUTATION } from '@/entities/transaction/gql'
import { apolloClient } from '@/shared/api/apollo'
import { CreateTransactionInput, Mutation, Transaction } from '@/shared/api/graphql'
import { toast } from '@/shared/lib'

class TransactionStore {
	transactions: Transaction[] = []
	lastTransaction: Transaction | null = null
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	createTransaction = async (input: CreateTransactionInput) => {
		this.loading = true
		this.error = null

		try {
			const { data } = await apolloClient.mutate<Pick<Mutation, 'createTransaction'>>({
				mutation: CREATE_TRANSCATION_MUTATION,
				variables: { input }
			})

			runInAction(() => {
				if (data?.createTransaction) {
					this.transactions.push(data.createTransaction)
					this.lastTransaction = data.createTransaction
				}
			})

			return data?.createTransaction
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
