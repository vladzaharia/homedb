import { Select, Image, Relation } from './baserow'
import { Product } from './product'

export type Device = Omit<
	Product,
	'Type' | 'Pairing Instructions' | 'Reset Instructions' | 'Restart Instructions' | 'Installations' | 'Manufacturer'
> & {
	Product: Relation[]
	'Product Type': Select[]
	'Pairing PIN': string
	'Pairing PIN 2': string
	Installed: boolean
	Room: Relation[]
	Floor: Relation[]
	'Ecosystem(s)': Relation[]
	Manufacturer: Select[]
}
