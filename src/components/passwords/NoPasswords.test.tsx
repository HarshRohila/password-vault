import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { NoPasswords } from './NoPasswords'

describe('Component | NoPasswords', () => {
	it('shows message for no password', async () => {
		render(<NoPasswords />)

		const msgElement = screen.getByTestId('message')
		expect(msgElement).toHaveTextContent("You don't have any passwords yet")
	})

	it('shows a button to add password', async () => {
		render(<NoPasswords />)

		const btn = screen.getByRole('button')
		expect(btn).toHaveTextContent('Add one')
	})
})

export {}
