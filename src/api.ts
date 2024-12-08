import axios, { AxiosInstance } from 'axios'

let AXIOS_INSTANCE: AxiosInstance

export const getAxiosInstance = () => {
	if (!AXIOS_INSTANCE) {
		AXIOS_INSTANCE = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}api/database`
		})

		AXIOS_INSTANCE.defaults.headers.common.Authorization = `Token ${import.meta.env.VITE_API_TOKEN}`
	}

	return AXIOS_INSTANCE
}
