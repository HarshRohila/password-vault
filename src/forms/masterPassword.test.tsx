import { MasterPwdForm } from './masterPassword';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Master Password Form', () => {
	it('calls onSubmit with masterPwd', async () => {
		const onSubmit = jest.fn();

		render(<MasterPwdForm onSubmit={onSubmit} />);

		userEvent.type(screen.getByLabelText(/master password/i), 'testing1');
		userEvent.click(screen.getByText('Submit'));

		await waitFor(() => {
			expect(onSubmit).toBeCalledWith({ masterPwd: 'testing1' });
		});
	});
});

export {};
