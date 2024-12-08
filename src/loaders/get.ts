import { Params } from 'react-router-dom'
import { Device } from '../models/device'
import { Product } from '../models/product'
import { Floor, Room } from 'src/models/room'
import { GenericGetLoader } from './_generic'

export async function GetDeviceLoader(params: { params: Params }) {
	return GenericGetLoader<Device>("Device", params)
}

export async function GetProductLoader(params: { params: Params }) {
	return GenericGetLoader<Product>("Product", params)
}

export async function GetRoomLoader(params: { params: Params }) {
	return GenericGetLoader<Room>("Room", params)
}

export async function GetFloorLoader(params: { params: Params }) {
	return GenericGetLoader<Floor>("Floor", params)
}


