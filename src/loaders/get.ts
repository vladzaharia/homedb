import { Params } from 'react-router-dom'
import { Device } from '../models/device'
import { Product } from '../models/product'
import { Floor, Room } from 'src/models/room'
import { GenericGetLoader } from './_generic'

export async function GetDeviceLoader({ params }: { params: Params }) {
	return GenericGetLoader<Device>("Device", params.device)
}

export async function GetProductLoader({ params }: { params: Params }) {
	return GenericGetLoader<Product>("Product", params.product)
}

export async function GetRoomLoader({ params }: { params: Params }) {
	return GenericGetLoader<Room>("Room", params.room)
}

export async function GetFloorLoader({ params }: { params: Params }) {
	return GenericGetLoader<Floor>("Floor", params.floor)
}


