import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from '@reach/router'
import credentialService from '../services/credentialService'
import { auth } from '../hooks/useAuth'
import { asyncHook } from '../hooks/useAsync'

type LoginProps = {
	navigate?: Function
}

export const Login = ({ navigate }: LoginProps) => {
	const { login, isLoggedIn, logout } = auth.useAuth()
	// const navigate = useNavigate()

	const handleSignOut = () => {
		logout()
	}

	const handleSignIn = useCallback(async () => {
		await login()
		// await gDriveService.save('')
		await credentialService.getCredentials()
		await navigate?.('/credentials')
	}, [])

	const { execute: doLogin, status: loginStatus } = asyncHook.useAsync(
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
