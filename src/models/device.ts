import { faBell, faCamera, faJar, faLightbulb, faLightSwitch, faOutlet, faPlug, faSensor, faSensorOn, faSpeaker, faSquareRing, faTelevision, faTv, IconDefinition } from "@fortawesome/pro-regular-svg-icons"
import { Image, Relation, Select } from "./field"

export type Device = {
	id: number,
	order: number,
	"Name": string,
	"Type"?: Select,
	"Protocol(s)": Select[],
	"Manufacturer": Select,
	"Image": Image[],
	"Pairing Instructions": string | null,
	"Reset Instructions": string | null,
	"Restart Instructions": string | null,
	"Notes": string,
	"Installations": Relation[],
}

export const GetDeviceTypeIcon = (deviceType?: Select): IconDefinition => {
	if (!deviceType) return faPlug

	switch (deviceType.id) {
		case 2799: // Light
			return faLightbulb
		case 2802: // Switch
		case 2835: // Dimmer
		case 2803: // Scene Controller
			return faLightSwitch
		case 2836: // Relay Switch
			return faJar
		case 2800: // Multisensor
			return faSensor
		case 2801: // Water Sensor
			return faSensorOn
		case 2804: // Button
			return faSquareRing
		case 2823: // Camera
			return faCamera
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
