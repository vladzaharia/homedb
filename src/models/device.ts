import { Select, Image, Relation } from "./baserow";
import { Product } from "./product";

export type Device = Omit<Product, "Type" | "Pairing Instructions" | "Reset Instructions" | "Restart Instructions" | "Installations" | "Manufacturer"> & {
	"Installed": boolean,
	"Product": Relation[],
	"Product Type": Select[],
	"Room": Relation[],
	"Floor": Relation[],
	"Pairing PIN": string,
	"Ecosystem(s)": Relation[],
	"Manufacturer": Select[],
}
