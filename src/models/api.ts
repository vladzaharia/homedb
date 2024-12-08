export type ApiListResult<T> = {
	count: number,
	next: string,
	previous: string,
	results: T[]
}
