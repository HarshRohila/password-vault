import React, { useEffect, useState } from 'react'
import { Credential as Cred } from './forms/CredentialForm'

type CredentialProps = {
	credential: Cred
}

export const CredentialCard = ({ credential }: CredentialProps) => {
	return (
		<>
			<h1>{credential.name}</h1>
			<div>{credential.password}</div>
		</>
	)
}
