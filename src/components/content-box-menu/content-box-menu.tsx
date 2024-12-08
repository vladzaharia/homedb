import Menu from '../../components/menu/menu'
import { hasAuthParams, useAuth } from 'react-oidc-context'
import { faBox, faDoorOpen, faPlug, faStairs } from '@awesome.me/kit-27cac3002e/icons/duotone/regular'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MenuItem } from '../../components/menu-item/menu-item'
import { useEffect } from 'react'
import './contet-box-menu.css'
import ContentBox from '../content-box/content-box'

export default function ContentBoxMenu() {
	const auth = useAuth()
	const authConfigured = !!auth.settings.authority
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (authConfigured && !!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
			auth.signinRedirect()
		}
	}, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect])

	return (
		<ContentBox className='flex-row'>
			<Menu
				headerProps={{
					title: 'Smart Home',
					className: 'corner-left',
				}}
			>
				{!authConfigured || auth.isAuthenticated ? (
					<>
						<MenuItem key="device" color="purple" text="Devices" icon={faPlug} destination="/device" />
						<MenuItem key="product" color="blue" text="Products" icon={faBox} destination="/product" />
						<MenuItem key="room" color="green" text="Rooms" icon={faDoorOpen} destination="/room" />
						<MenuItem key="floor" color="red" text="Floors" icon={faStairs} destination="/floor" />
					</>
				) : undefined}
			</Menu>
			<AnimatePresence mode="popLayout">
				<motion.div
					className="content-box-menu no-animate"
					key={location.pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					{!authConfigured || auth.isAuthenticated ? (
						<Outlet />
					) : (
						<div className="login">{auth.isLoading ? 'Logging in...' : 'Press the login button to continue.'}</div>
					)}
				</motion.div>
			</AnimatePresence>
		</ContentBox>
	)
}
