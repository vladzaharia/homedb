import {
	faArrowUpBigSmall,
	faBath,
	faBedFront,
	faBoxTaped,
	faChairOffice,
	faClothesHanger,
	faContainerStorage,
	faDoorOpen,
	faHeat,
	faLoveseat,
	faPotFood,
	faQuestion,
	faStairs,
	faTablePicnic,
	faUtensils,
	faWasher,
} from '@awesome.me/kit-27cac3002e/icons/duotone/solid'
import { Relation, Row } from './baserow'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faToilet } from '@awesome.me/kit-27cac3002e/icons/classic/regular'

export type Room = Row & {
	Name: string
	Notes: string
	Floors: Relation[]
	Installations: Relation[]
}

export type Floor = Row & {
	Name: string
	Rooms: Relation[]
}

export const GetRoomIcon = (id: number): IconDefinition => {
	switch (id) {
		case 1: // Entryway
			return faDoorOpen
		case 2: // Hallway
		case 12: // Hallway
			return faArrowUpBigSmall
		case 16: // Thorage
			return faBoxTaped
		case 3: // Guest Bedroom
		case 13: // Bedroom
			return faBedFront
		case 4: // Guest Bathroom
		case 14: // Bathroom
			return faBath
		case 5: // Harry Potter Closet
			return faContainerStorage
		case 7: // Kitchen
			return faPotFood
		case 8: // Dining Room
			return faUtensils
		case 9: // Half Bathroom
		case 22: // Toilet Room
			return faToilet
		case 11: // Laundry Closet
			return faWasher
		case 15: // Closet
			return faClothesHanger
		case 18: // Lounge
			return faLoveseat
		case 19: // Office
			return faChairOffice
		case 20: // Deck
			return faTablePicnic
		case 21: // Heater Closet
			return faHeat
		case 6: // 1/2 Staircase
		case 10: // 2/3 Staircase
		case 17: // 3/4 Staircase
			return faStairs
		default:
			return faQuestion
	}
}
