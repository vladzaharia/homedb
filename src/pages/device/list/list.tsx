import { useLoaderData, useNavigate } from 'react-router-dom'
import './list.css'
import Header from '../../../components/header/header'
import Button from '../../../components/button/button'
import { faPlus, faTrash, faXmark, faGlobeAmericas, faPlug } from '@awesome.me/kit-27cac3002e/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Table from '../../../components/table/table'
import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { useNotificationAwareRequest } from '../../../hooks/notification'
import Modal, { ConfirmModal } from '../../../components/modal/modal'
import useReload from '../../../hooks/reload'
import { TripEdit } from '../../../components/trip-edit/trip-edit'
import { Device } from '../../../models/device'
import { faBox } from '@awesome.me/kit-27cac3002e/icons/duotone/regular'
import { GetRoomIcon } from 'src/models/room'

export default function ListDevices() {
	const devices = useLoaderData() as Device[]
	useReload(devices)
	const navigate = useNavigate()
	const auth = useAuth()
	const request = useNotificationAwareRequest()
	const [deleteModalDeviceId, setDeleteModalDeviceId] = useState<number | undefined>()
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

	const deleteDevice = async (id: number) => {
		// await request(
		// 	async () => await api.deleteDevice(id),
		// 	{
		// 		message: `Device ${id} deleted successfully!`,
		// 		source: 'trip',
		// 		icon: faTrash,
		// 	},
		// 	() => setDeleteModalDeviceId(undefined),
		// 	() => setDeleteModalDeviceId(undefined)
		// )
	}

	return (
		<div className="list device-list">
			<Header
				title="Devices"
				color="purple"
				className="corner-right"
				leftActions={<FontAwesomeIcon icon={faBox} size="lg" />}
				rightActions={<Button color="purple" onClick={() => navigate(`/`)} iconProps={{ icon: faXmark }} />}
			/>
			<Table
				color="purple"
				headers={[
					{ element: 'Name' },
					{ element: 'Product', className: 'no-mobile' },
					{ element: 'Room', className: 'no-mobile' },
					{ element: 'Floors', className: 'no-mobile' },
					{
						element:
							auth.isAuthenticated && false ? (
								<div className="buttons">
									<Button color="green" iconProps={{ icon: faPlus }} onClick={() => setShowCreateModal(true)} />
								</div>
							) : (
								<></>
							),
					},
				]}
				rows={devices.map((device) => {
					return {
						name: device.id.toString(),
						cells: [
							{
								element: (
									<>
										{device.Image.length > 0 ? <img src={device.Image[0].url} height={32} className="mr-1" /> : <></>} {device.Name}
									</>
								),
							},
							{
								element: device.Product[0]?.value || '',
								className: 'no-mobile',
							},
							{
								element: device.Room[0] ? (
									<>
										<FontAwesomeIcon className="mr-05" icon={GetRoomIcon(device.Room[0]?.id)} />
										{device.Room[0]?.value}
									</>
								) : (
									''
								),
							},
							{ element: device.Floor[0]?.value || '' },
							{
								element:
									auth.isAuthenticated && false ? (
										<div className="buttons">
											<Button
												color="red"
												iconProps={{ icon: faTrash }}
												onClick={(e) => {
													e.stopPropagation()
													setDeleteModalDeviceId(device.id)
												}}
											/>
										</div>
									) : (
										<></>
									),
							},
						],
						// onClick: () => navigate(`/device/${device.id}`),
					}
				})}
			/>

			<ConfirmModal
				title={`Delete ${deleteModalDeviceId}?`}
				icon={faTrash}
				open={!!deleteModalDeviceId}
				text={`Are you sure you want to delete ${deleteModalDeviceId}?`}
				onConfirm={() => deleteDevice(deleteModalDeviceId!)}
				onClose={() => setDeleteModalDeviceId(undefined)}
			/>

			<Modal className="create-modal" open={showCreateModal} onClose={() => setShowCreateModal(false)}>
				<>
					<Header
						className="corner-left-05 corner-right-05"
						title={
							<>
								<FontAwesomeIcon className="mr-05" icon={faGlobeAmericas} /> Add trip
							</>
						}
						rightActions={
							<div className="modal-header-buttons">
								<Button color="primary" iconProps={{ icon: faXmark }} onClick={() => setShowCreateModal(false)} />
							</div>
						}
					/>
					<TripEdit inModal onModalClose={() => setShowCreateModal(false)} />
				</>
			</Modal>
		</div>
	)
}
