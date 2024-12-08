export const TABLES = {
	"Floor": 244,
	"Room": 272,
	"Product": 601,
	"Device": 602
}

export type TableKeys = keyof typeof TABLES

export type Row = {
	id: number,
	order: number
}

export type Select = {
	id: number,
	value: string,
	color: string
} | null

export type File = {
	name: string,
	is_image: boolean,
	mime_type: string,
	size: string,
	uploaded_at: string,
	url: string,
}

export type Image = File & {
	is_image: true,
	image_width: number,
	image_height: number,
	thumbnails: {
		tiny: Thumbnail,
		small: Thumbnail,
		medium?: Thumbnail,
		large?: Thumbnail
	}
}

type Thumbnail = {
	url: string,
	height: number,
	width: number
}

export type Relation = {
	id: number,
	value: string
}

export type ApiListResult<T> = {
	count: number,
	next: string,
	previous: string,
	results: T[]
}
