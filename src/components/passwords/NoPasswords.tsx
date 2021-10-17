import React, { useEffect, useState } from 'react'

type NoPasswordsProps = {}

export const NoPasswords = ({}: NoPasswordsProps) => {
	return (
		<>
			<p data-testid="message">You don't have any passwords yet</p>
			<button>Add one</button>
		</>
	)
}
