import React from 'react'
import credentialService from '../services/credentialService'
import { CredsList } from './CredsList'
import { shallow } from 'enzyme'
import { NoPasswords } from './passwords/NoPasswords'

describe('Component | CredsList', () => {
	it('renders no password component if no passwords are stored', async () => {
		credentialService.getCredentials = jest.fn().mockResolvedValueOnce([])

		const wrapper = shallow(<CredsList />)

		expect(wrapper.find(NoPasswords)).toHaveLength(1)
	})
})
