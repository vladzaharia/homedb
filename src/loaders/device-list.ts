import { ApiListResult } from '../models/api'
import { getAxiosInstance } from '../api'
import { Device } from '../models/device'

export default async function ListDevicesLoader() {
	const api = getAxiosInstance()
	return (await api.get<ApiListResult<Device>>('/rows/table/601/?user_field_names=true')).data.results.filter((device) => device.Type !== null)
}
