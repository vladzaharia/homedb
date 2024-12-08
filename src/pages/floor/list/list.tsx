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
import { Floor } from '../../../models/room'
import { faBox } from '@awesome.me/kit-27cac3002e/icons/duotone/regular'

export default function ListFloors() {
	const floors = useLoaderData() as Floor[]
	useReload(floors)
	const navigate = useNavigate()
	const auth = useAuth()
	const request = useNotificationAwareRequest()
	const [deleteModalFloorId, setDeleteModalFloorId] = useState<number | undefined>()
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

	const deleteFloor = async (id: number) => {
		// await request(
		// 	async () => await api.deleteFloor(id),
		// 	{
		// 		message: `Floor ${id} deleted successfully!`,
		// 		source: 'trip',
		// 		icon: faTrash,
		// 	},
		// 	() => setDeleteModalFloorId(undefined),
		// 	() => setDeleteModalFloorId(undefined)
		// )
	}

	return (
		<div className="list floor-list">
			<Header
				title="Floors"
				color="red"
				className="corner-right"
				leftActions={<FontAwesomeIcon icon={faBox} size="lg" />}
				rightActions={<Button color="green" onClick={() => navigate(`/`)} iconProps={{ icon: faXmark }} />}
			/>
			<Table
				color="red"
				headers={[
					{ element: 'Floor Name' },
					{ element: 'Rooms', className: 'no-mobile' },
					{
						element: auth.isAuthenticated && false ? (
							<div className="buttons">
								<Button color="green" iconProps={{ icon: faPlus }} onClick={() => setShowCreateModal(true)} />
							</div>
						) : <></>,
					},
				]}
				rows={floors.map((floor) => {
					return {
						name: floor.id.toString(),
						cells: [
							{
								element: floor.Name
							},
							{
								element: floor.Rooms.length.toString(),
								className: 'no-mobile',
							},
							{
								element: auth.isAuthenticated && false ? (
									<div className="buttons">
										<Button
											color="red"
											iconProps={{ icon: faTrash }}
											onClick={(e) => {
												e.stopPropagation()
												setDeleteModalFloorId(floor.id)
											}}
										/>
									</div>
								) : <></>,
							},
						],
						// onClick: () => navigate(`/floor/${floor.id}`),
					}
				})}
			/>

			<ConfirmModal
				title={`Delete ${deleteModalFloorId}?`}
				icon={faTrash}
				open={!!deleteModalFloorId}
				text={`Are you sure you want to delete ${deleteModalFloorId}?`}
				onConfirm={() => deleteFloor(deleteModalFloorId!)}
				onClose={() => setDeleteModalFloorId(undefined)}
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
