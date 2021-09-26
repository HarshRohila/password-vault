import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Button } from '../ui/Button'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useAsync from '../hooks/useAsync'
// import { useNavigate } from '@reach/router'
import credentialService from '../services/credentialService'

type LoginProps = {
	navigate?: Function
}

export const Login = ({ navigate }: LoginProps) => {
	const { login, isLoggedIn, logout } = useAuth()
	// const navigate = useNavigate()

	const handleSignOut = () => {
		logout()
	}

	const handleSignIn = useCallback(async () => {
		await login()
		await credentialService.getCredentials()
		navigate?.('/credentials')
	}, [])

	const { execute: doLogin, status: loginStatus } = useAsync(
		handleSignIn,
		false
	)

	return (
		<>
			{!isLoggedIn && (
				<Button onClick={doLogin}>
					Sign In
					{loginStatus === 'pending' && (
						<FontAwesomeIcon icon={faSpinner} spin />
					)}
				</Button>
			)}
			{loginStatus === 'error' && <p>Failed to login, please try again</p>}
			{isLoggedIn && <Button onClick={handleSignOut}>Sign Out</Button>}
		</>
	)
}
