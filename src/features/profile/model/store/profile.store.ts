import { makeAutoObservable } from 'mobx'

class ProfileStore {
	loading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setLoading(loading: boolean) {
		this.loading = loading
	}

	setError(error: string | null) {
		this.error = error
	}
}

export const profileStore = new ProfileStore()
