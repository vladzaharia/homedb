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
