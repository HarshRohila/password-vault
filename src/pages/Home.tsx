// import { Link } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { Login } from '../components/Login'
import useAuth from '../hooks/useAuth'

type HomePageProps = {}

export const HomePage = ({}: HomePageProps) => {
	const { isLoggedIn } = useAuth()

	useEffect(() => {}, [])

	return (
		<>
			<Login />
			{/* {isLoggedIn && <MasterPwdForm /> && (
				<nav>
					<Link to="credentials">Show Credentials</Link>
				</nav>
			)} */}
		</>
	)
}
