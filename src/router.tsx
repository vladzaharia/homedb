import { StrictMode, Fragment } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './components/app/app'
import ContentBox from './components/content-box/content-box'
import './styles'
import { RouterErrorBoundary } from './pages/error/error'
import ListProducts from './pages/product/list/list'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'
import ContentBoxMenu from './components/content-box-menu/content-box-menu'
import ListDevices from './pages/device/list/list'
import { ListDevicesLoader, ListFloorsLoader, ListProductsLoader, ListRoomsLoader } from './loaders/list'
import { GetDeviceLoader, GetFloorLoader, GetProductLoader, GetRoomLoader } from './loaders/get'
import ListRooms from './pages/room/list/list'
import ListFloors from './pages/floor/list/list'

const init = async () => {
	const oidcConfig: AuthProviderProps = {
		authority: import.meta.env.VITE_OIDC_AUTHORITY,
		client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
		scope: import.meta.env.VITE_OIDC_SCOPE,
		redirect_uri: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
		onSigninCallback: () => {
			window.history.replaceState({}, document.title, window.location.pathname)
		},
	}

	const router = createBrowserRouter([
		{
			element: (
				<App>
					<ContentBoxMenu />
				</App>
			),
			id: 'root',
			errorElement: (
				<App>
					<ContentBox>
						<RouterErrorBoundary />
					</ContentBox>
				</App>
			),
			children: [
				{
					path: '/device',
					id: 'devices',
					loader: ListDevicesLoader,
					element: <ListDevices />,
					children: [
						{
							path: ':device',
							id: 'device',
							loader: GetDeviceLoader,
							element: <Fragment />,
						},
					],
				},
				{
					path: '/product',
					id: 'proucts',
					loader: ListProductsLoader,
					element: <ListProducts />,
					children: [
						{
							path: ':product',
							id: 'product',
							loader: GetProductLoader,
							element: <Fragment />,
						},
					],
				},
				{
					path: '/room',
					id: 'rooms',
					loader: ListRoomsLoader,
					element: <ListRooms />,
					children: [
						{
							path: ':room',
							id: 'room',
							loader: GetRoomLoader,
							element: <Fragment />,
						},
					],
				},
				{
					path: '/floor',
					id: 'floors',
					loader: ListFloorsLoader,
					element: <ListFloors />,
					children: [
						{
							path: ':floor',
							id: 'floor',
							loader: GetFloorLoader,
							element: <Fragment />,
						},
					],
				},
			],
		},
	])

	const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
	root.render(
		<StrictMode>
			<AuthProvider {...oidcConfig}>
				<RouterProvider router={router} />
			</AuthProvider>
		</StrictMode>
	)
}

init()
