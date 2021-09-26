import React, { FormEvent, useEffect, useState } from 'react'

export interface Credential {
	name: string
	password: string
}

type CredentialFormProps = {
	onSubmit: (credential: Credential) => void
}

export const CredentialForm = ({ onSubmit }: CredentialFormProps) => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		onSubmit({
			name,
			password,
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Searchable Name"
				value={name}
				onChange={({ target }) => setName(target.value)}
			/>
			<input
				type="text"
				placeholder="Password"
				value={password}
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button type="submit">Save</button>
		</form>
	)
}
