export const maskedInput = (value: string, mask?: string) => {
	if (!mask) return value

	let maskedValue = ''
	let maskIndex = 0
	let valueIndex = 0

	while (valueIndex < value.length && maskIndex < mask.length) {
		if (mask[maskIndex] === '9') {
			if (/\d/.test(value[valueIndex])) {
				maskedValue += value[valueIndex]
				valueIndex++
			} else {
				valueIndex++
				continue
			}
		} else {
			maskedValue += mask[maskIndex]
			if (mask[maskIndex] === value[valueIndex]) {
				valueIndex++
			}
		}
		maskIndex++
	}

	return maskedValue
}
