import { Relation, Row } from "./baserow";

export type Room = Row & {
	"Name": string,
	"Notes": string,
	"Floors": Relation[],
	"Installations": Relation[]
}

export type Floor = Row & {
	"Name": string,
	"Rooms": Relation[]
}
