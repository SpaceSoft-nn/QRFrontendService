export const getBase64ImageUrl = (base64String: string) => {
	return `data:image/png;base64,${base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')}`
}
