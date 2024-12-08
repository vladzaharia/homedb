import { Device } from '../models/device'
import { Product } from 'src/models/product'
import { GenericListLoader } from './_generic'
import { Floor, Room } from 'src/models/room'

export async function ListDevicesLoader() {
	return GenericListLoader<Device>("Device")
}

export async function ListProductsLoader() {
	return GenericListLoader<Product>("Product", (product) => product.Type !== null)
}

export async function ListRoomsLoader() {
	return GenericListLoader<Room>("Room")
}

export async function ListFloorsLoader() {
	return GenericListLoader<Floor>("Floor")
}
