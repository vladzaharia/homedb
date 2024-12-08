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
import { GetRoomIcon, Room } from '../../../models/room'
import { faBox } from '@awesome.me/kit-27cac3002e/icons/duotone/regular'

export default function ListRooms() {
	const rooms = useLoaderData() as Room[]
	useReload(rooms)
	const navigate = useNavigate()
	const auth = useAuth()
	const request = useNotificationAwareRequest()
	const [deleteModalRoomId, setDeleteModalRoomId] = useState<number | undefined>()
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

	const deleteRoom = async (id: number) => {
		// await request(
		// 	async () => await api.deleteRoom(id),
		// 	{
		// 		message: `Room ${id} deleted successfully!`,
		// 		source: 'trip',
		// 		icon: faTrash,
		// 	},
		// 	() => setDeleteModalRoomId(undefined),
		// 	() => setDeleteModalRoomId(undefined)
		// )
	}

	return (
		<div className="list room-list">
			<Header
				title="Rooms"
				color="green"
				className="corner-right"
				leftActions={<FontAwesomeIcon icon={faBox} size="lg" />}
				rightActions={<Button color="green" onClick={() => navigate(`/`)} iconProps={{ icon: faXmark }} />}
			/>
			<Table
				color="green"
				headers={[
					{ element: 'Room Name' },
					{ element: 'Floors', className: 'table-cell-md no-mobile' },
					{ element: 'Installed Devices', className: 'no-mobile' },
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
				rows={rooms.map((room) => {
					return {
						name: room.id.toString(),
						cells: [
							{
								element: (
									<>
										<FontAwesomeIcon className="mr-05" icon={GetRoomIcon(room.id)} />
										{room.Name}
									</>
								),
							},
							{
								element: room.Floors.map((floor) => floor.value).join(', '),
								className: 'table-cell-md no-mobile',
							},
							{
								element: room.Installations.length.toString(),
								className: 'no-mobile',
							},
							{
								element:
									auth.isAuthenticated && false ? (
										<div className="buttons">
											<Button
												color="red"
												iconProps={{ icon: faTrash }}
												onClick={(e) => {
													e.stopPropagation()
													setDeleteModalRoomId(room.id)
												}}
											/>
										</div>
									) : (
										<></>
									),
							},
						],
						// onClick: () => navigate(`/room/${room.id}`),
					}
				})}
			/>

			<ConfirmModal
				title={`Delete ${deleteModalRoomId}?`}
				icon={faTrash}
				open={!!deleteModalRoomId}
				text={`Are you sure you want to delete ${deleteModalRoomId}?`}
				onConfirm={() => deleteRoom(deleteModalRoomId!)}
				onClose={() => setDeleteModalRoomId(undefined)}
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
