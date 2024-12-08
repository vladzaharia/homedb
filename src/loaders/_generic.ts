import { Params } from "react-router-dom"
import { ApiListResult, TableKeys, TABLES } from "../models/baserow"
import { getAxiosInstance } from "../api"

/**
 * Generic loader to get a single row of a table
 *
 * **DO NOT USE THIS, USE A SPECIFIC LOADER INSTEAD**
 * @param tableKey Key of table to use
 * @param params Object including `device` to retrieve
 * @returns
 */
export async function GenericGetLoader<T>(tableKey: TableKeys, param?: string) {
	const api = getAxiosInstance()
	return (await api.get<T>(`/rows/table/${TABLES[tableKey]}/${param}/?user_field_names=true}`)).data
}

/**
 * Generic loader to get all rows of a table
 *
 * **DO NOT USE THIS, USE A SPECIFIC LOADER INSTEAD**
 * @param tableKey Key of table to use
 * @returns
 */
export async function GenericListLoader<T>(tableKey: TableKeys, filterFn: (item: T) => boolean = () => true) {
	const api = getAxiosInstance()
	return (await api.get<ApiListResult<T>>(`/rows/table/${TABLES[tableKey]}/?user_field_names=true`)).data.results.filter(filterFn)
}
