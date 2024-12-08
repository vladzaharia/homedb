import { StrictMode, Fragment } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './components/app/app'
import ContentBox from './components/content-box/content-box'
import './styles'
import { RouterErrorBoundary } from './pages/error/error'
import ListDevicesLoader from './loaders/device-list'
import GetDeviceLoader from './loaders/device-get'
import ListDevices from './pages/device/list/list'
// import { Device } from './pages/device/device'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'

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
					<ContentBox />
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
