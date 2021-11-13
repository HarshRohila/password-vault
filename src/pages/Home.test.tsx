import {
	createHistory,
	createMemorySource,
	LocationProvider,
} from '@reach/router'
import { render, shallow } from 'enzyme'
import { Login } from '../components/Login'
import { router } from '../utils/router'
import { HomePage } from './Home'

describe('Component | Homepage', () => {
	it('renders Login component', async () => {
		router.useNavigate = jest.fn()
		const wrapper = shallow(<HomePage />)

		expect(wrapper.find(Login).length).toBe(1)
	})
})

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
	ui: any,
	{ route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
	return {
		...render(<LocationProvider history={history}>{ui}</LocationProvider>),
		// adding `history` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		history,
	}
}
