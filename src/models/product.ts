import {
	faBell,
	faCameraSecurity,
	faJar,
	faLightbulb,
	faLightSwitch,
	faOutlet,
	faPlug,
	faSensor,
	faSensorOn,
	faSpeaker,
	faSquareRing,
	faTv,
	faToggleOn,
	faBluetooth,
	faQuestion,
	faWifi
} from '@awesome.me/kit-27cac3002e/icons/duotone/solid'
import { Image, Relation, Row, Select } from './baserow'
import { IconDefinition } from '@awesome.me/kit-27cac3002e/icons'
import { faCyncSm, faHomekit, faMatter, faThread, faZigbee, faZWave } from '@awesome.me/kit-27cac3002e/icons/kit/custom'
import { faGoogle } from '@awesome.me/kit-27cac3002e/icons/classic/brands'

export type Product = Row & {
	Name: string
	Type?: Select
	Protocols: Select[]
	Manufacturer: Select
	Image: Image[]
	'Pairing Instructions': string | null
	'Reset Instructions': string | null
	'Restart Instructions': string | null
	Notes: string
	Installations: Relation[]
}

export const GetProductTypeIcon = (deviceType?: Select): IconDefinition => {
	if (!deviceType) return faPlug

	switch (deviceType.id) {
		case 2799: // Light
			return faLightbulb
		case 2802: // Switch
		case 2803: // Scene Controller
			return faLightSwitch
		case 2836: // Relay Switch
			return faToggleOn
		case 2800: // Motion Sensor
		case 2842: // Contact Sensor
			return faSensor
		case 2801: // Water Sensor
			return faSensorOn
		case 2804: // Button
			return faSquareRing
		case 2823: // Camera
			return faCameraSecurity
		case 2822: // Doorbell
			return faBell
		case 2826: // TV
			return faTv
		case 2824: // Speaker
			return faSpeaker
		case 2837: // Smart Plug
			return faOutlet
		default:
			return faPlug
	}
}

export const GetProductProtocolIcon = (protocol?: Select): IconDefinition => {
	if (!protocol) return faPlug

	switch (protocol.id) {
		case 2805: // Matter
			return faMatter
		case 2806: // Thread
			return faThread
		case 2807: // Wifi
			return faWifi
		case 2808: // Z-Wave
			return faZWave
		case 2809: // Zigbee
			return faZigbee
		case 2810: // BLE
			return faBluetooth
		case 2811: // Cync
			return faCyncSm
		case 2843: // HomeKit
			return faHomekit
		case 2844: // Google Home
			return faGoogle
		default:
			return faQuestion
	}
}
