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
import { Product, GetProductTypeIcon, GetProductProtocolIcon } from '../../../models/product'
import { faBox } from '@awesome.me/kit-27cac3002e/icons/duotone/regular'

export default function ListProducts() {
	const products = useLoaderData() as Product[]
	useReload(products)
	const navigate = useNavigate()
	const auth = useAuth()
	const request = useNotificationAwareRequest()
	const [deleteModalProductId, setDeleteModalProductId] = useState<number | undefined>()
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

	const deleteProduct = async (id: number) => {
		// await request(
		// 	async () => await api.deleteProduct(id),
		// 	{
		// 		message: `Product ${id} deleted successfully!`,
		// 		source: 'trip',
		// 		icon: faTrash,
		// 	},
		// 	() => setDeleteModalProductId(undefined),
		// 	() => setDeleteModalProductId(undefined)
		// )
	}

	return (
		<div className="list product-list">
			<Header
				title="Products"
				color="blue"
				className="corner-right"
				leftActions={<FontAwesomeIcon icon={faBox} size="lg" />}
				rightActions={<Button color="blue" onClick={() => navigate(`/`)} iconProps={{ icon: faXmark }} />}
			/>
			<Table
				color="blue"
				headers={[
					{ element: 'Product Name' },
					{ element: 'Type', className: 'no-mobile' },
					{ element: 'Manufacturer', className: 'no-mobile' },
					{ element: 'Protocols', className: 'no-mobile' },
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
				rows={products.map((product) => {
					return {
						name: product.id.toString(),
						cells: [
							{
								element: (
									<>
										{product.Image.length > 0 ? <img src={product.Image[0].url} height={32} className="mr-1" /> : <></>} {product.Name}
									</>
								),
							},
							{
								element: (
									<span>
										<FontAwesomeIcon className="mr-05" icon={GetProductTypeIcon(product.Type)} /> {product.Type?.value}
									</span>
								),
								className: 'no-mobile',
							},
							{ element: product.Manufacturer?.value || '' },
							{
								element: (
									<>
										{product['Protocols'].map((p) => (
											<FontAwesomeIcon className="mr-05 ml-05" title={p?.value} icon={GetProductProtocolIcon(p)} />
										))}
									</>
								),
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
													setDeleteModalProductId(product.id)
												}}
											/>
										</div>
									) : (
										<></>
									),
							},
						],
						// onClick: () => navigate(`/product/${product.id}`),
					}
				})}
			/>

			<ConfirmModal
				title={`Delete ${deleteModalProductId}?`}
				icon={faTrash}
				open={!!deleteModalProductId}
				text={`Are you sure you want to delete ${deleteModalProductId}?`}
				onConfirm={() => deleteProduct(deleteModalProductId!)}
				onClose={() => setDeleteModalProductId(undefined)}
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
