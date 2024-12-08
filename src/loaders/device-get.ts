import { Params } from 'react-router-dom'
import { getAxiosInstance } from '../api'
import { Device } from '../models/device'

export default async function GetDeviceLoader({ params }: { params: Params }) {
	const api = getAxiosInstance()
	return (await api.get<Device>(`/rows/table/601/${params.device}/?user_field_names=true}`)).data
}
