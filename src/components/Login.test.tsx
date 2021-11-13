import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAtom } from 'jotai'
import React from 'react'
import { asyncHook } from '../hooks/useAsync'
import { auth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import credentialService from '../services/credentialService'
import { authDataAtom } from '../states'
import { mockedEnv, MockObjConfig } from '../utils/mockedEnv'
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
		let originalUseAuth = auth.useAuth
		auth.useAuth = jest.fn().mockReturnValue({
			isLoggedIn: false,
			login: jest.fn(),
			logout: jest.fn(),
		})

		const navigate = jest.fn()
		render(<Login navigate={navigate} />)

		authService.login = jest.fn()
		credentialService.getCredentials = jest.fn()

		const [siginBtn] = screen.getAllByText('Sign In')
		siginBtn.click()

		await waitFor(() => {
			expect(navigate).toBeCalledWith('/credentials')
		})

		auth.useAuth = originalUseAuth
	})

	it('sign in button shows error message on login fail', async () => {
		let mocks: MockObjConfig[] = [
			{
				object: asyncHook,
				mocks: {
					useAsync: jest.fn().mockReturnValue({ status: 'error' }),
				},
			},
			{
				object: auth,
				mocks: {
					useAuth: jest.fn().mockReturnValue({ isLoggedIn: false }),
				},
			},
		]
		mockedEnv(mocks, async () => {
			render(<Login />)

			credentialService.getCredentials = jest.fn()

			const [siginBtn] = screen.getAllByText('Sign In')
			siginBtn.click()

			await waitFor(() => {
				const errorElement = screen.getByText(
					'Failed to login, please try again'
				)
				expect(errorElement).toBeTruthy()
			})
		})
	})
})

export {}
