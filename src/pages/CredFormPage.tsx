import React, { useEffect, useState } from 'react'
import { Credential, CredentialForm } from '../components/forms/CredentialForm'

type CredFormPageProps = {}

export const CredFormPage = ({}: CredFormPageProps) => {
	const handleSubmitCredForm = (credential: Credential) => {
		console.log(credential)
	}

	return (
		<>
			<CredentialForm onSubmit={handleSubmitCredForm} />
		</>
	)
}
