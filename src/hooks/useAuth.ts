import { useAtom } from 'jotai';
import { isLoggedIn } from '../states';

export default function useAuth() {
	const [isSignedIn, setIsSignedIn] = useAtom(isLoggedIn);

	return {
		isLoggedIn: isSignedIn,
		login() {
			setIsSignedIn(true);
		},
		logout() {
			setIsSignedIn(false);
		},
	};
}
