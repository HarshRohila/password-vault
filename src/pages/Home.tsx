import React, { useEffect, useState } from 'react'
import { Login } from '../components/Login'
import { router } from '../utils/router'

type HomePageProps = {}

export const HomePage = ({}: HomePageProps) => {
	const navigate = router.useNavigate()

	useEffect(() => {}, [])

	return (
		<>
			<h1>Welcome to Password Vault!</h1>
			<p>This app helps you store passwords.</p>
			<Login navigate={navigate} />
			<p>
				Passwords are stored in your google drive. Sign in with your google
				account to continue
			</p>
			{/* {isLoggedIn && <MasterPwdForm /> && (
				<nav>
					<Link to="credentials">Show Credentials</Link>
				</nav>
			)} */}
		</>
	)
}
