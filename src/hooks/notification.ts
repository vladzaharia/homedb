import { IconDefinition } from '@awesome.me/kit-27cac3002e/icons/classic/regular'
import { createContext, useContext } from 'react'
import { isAxiosError } from 'axios'
import { faCheck } from '@awesome.me/kit-27cac3002e/icons/classic/solid'
import { useRevalidator } from 'react-router-dom'

export type NotificationSource = 'trip' | 'db-reset' | 'db-migrate' | 'db-rollback' | 'waypoint'
export type NotificationType = 'success' | 'failed' | 'warning'

export interface NotificationDetails {
	message: string
	icon?: IconDefinition
	notificationType?: NotificationType
	source?: NotificationSource
	dismissable?: boolean
	timeout?: number
}

export interface NotificationContextProps {
	notification?: NotificationDetails
	setNotification: React.Dispatch<React.SetStateAction<NotificationDetails | undefined>>
	setError: (message?: string, source?: NotificationSource) => void
	showNotification: boolean
	setShowNotification: React.Dispatch<React.SetStateAction<boolean>>
}
export const NotificationContext = createContext<NotificationContextProps>({
	setNotification: () => {
		return
	},
	setError: () => {
		return
	},
	showNotification: false,
	setShowNotification: () => {
		return
	},
})

export function useNotificationAwareRequest() {
	const { setError, setNotification } = useContext(NotificationContext)
	const { revalidate } = useRevalidator()

	const execute = async <T>(
		request: () => Promise<T>,
		notificationDetails?: Omit<NotificationDetails, 'notificationType'>,
		onSuccess?: (response: T) => void,
		onCatch?: () => void,
	) => {
		try {
			const response = await await request()

			notificationDetails &&
				setNotification({
					icon: faCheck,
					...notificationDetails,
					notificationType: 'success',
				})

			onSuccess && onSuccess(response)
			revalidate()
		} catch (e) {
			onCatch && onCatch()

			if (isAxiosError(e)) {
				setError(e.response?.data.message || e.message, notificationDetails?.source)
			} else {
				setError('Something went wrong!', notificationDetails?.source)
			}
		}
	}

	return execute
}
