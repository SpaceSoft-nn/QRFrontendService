export const formatCurrency = (value: number | string) => {
	const numericValue = typeof value === 'string' ? parseFloat(value) : value

	if (isNaN(numericValue)) {
		return '0 ₽'
	}

	const formattedValue = numericValue.toFixed(2)
	const [whole, decimal] = formattedValue.split('.')
	const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

	if (decimal === '00') {
		return `${formattedWhole} ₽`
	}

	return `${formattedWhole}.${decimal} ₽`
}
