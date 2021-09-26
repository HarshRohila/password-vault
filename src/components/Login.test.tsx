import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { authService } from '../services/authService'
import credentialService from '../services/credentialService'
import { Login } from './Login'

describe('Login | Component', () => {
	it('shows Sign In button', async () => {
		render(<Login />)

		const [siginBtn] = screen.getAllByText('Sign In')
		expect(siginBtn).toBeTruthy()
	})

	it('sign in button logs in user and gets credentials', async () => {
		render(<Login />)
		authService.login = jest.fn()
		credentialService.getCredentials = jest.fn()

		const [siginBtn] = screen.getAllByText('Sign In')
		siginBtn.click()

		await waitFor(() => {
			expect(authService.login).toBeCalledTimes(1)
			expect(credentialService.getCredentials).toBeCalledTimes(1)
		})
	})

	it('sign in button navigates to credentials page', async () => {
		const navigate = jest.fn()
		render(<Login navigate={navigate} />)

		authService.login = jest.fn()
		credentialService.getCredentials = jest.fn()

		const [siginBtn] = screen.getAllByText('Sign In')
		siginBtn.click()

		await waitFor(() => {
			expect(navigate).toBeCalledWith('/credentials')
		})
	})

	it('sign in button shows error message on login fail', async () => {
		render(<Login />)

		authService.login = jest.fn().mockRejectedValueOnce(undefined)
		credentialService.getCredentials = jest.fn()

		const [siginBtn] = screen.getAllByText('Sign In')
		siginBtn.click()

		await waitFor(() => {
			const errorElement = screen.getByText('Failed to login, please try again')
			expect(errorElement).toBeTruthy()
		})
	})
})

export {}
