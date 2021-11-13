import { Link } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { asyncHook } from '../hooks/useAsync'
import credentialService from '../services/credentialService'
import { CredentialCard } from './Credential'
import { NoPasswords } from './passwords/NoPasswords'

type CredsListProps = {}

export const CredsList = ({}: CredsListProps) => {
	const { status, value: credentials } = asyncHook.useAsync(
		credentialService.getCredentials
	)
	return (
		<>
			{/* <Link to="/credentials/create">+</Link> */}
			{console.log(credentials)}
			{credentials && (
				<ul>
					{credentials.map((credential, index) => (
						<li key={index}>
							<CredentialCard credential={credential} />
						</li>
					))}
				</ul>
			)}
			{!credentials?.length && <NoPasswords />}
			{/* {status === 'pending' && <h1>Loading...</h1>}
			{status === 'error' && console.error(error)} */}
		</>
	)
}
