import { useAtom } from 'jotai'
import gDriveService from '../gdriveService'
import { authService } from '../services/authService'
import { authDataAtom } from '../states'

export default function useAuth() {
	const [authData, setAuthData] = useAtom(authDataAtom)

	return {
		isLoggedIn: !!authData,
		async login() {
			await authService.login()
			// await Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.NONE);
			// const googleAuthProvider = new Firebase.auth.GoogleAuthProvider();
			// const firebaseAuthData = await Firebase.auth().signInWithPopup(
			// 	googleAuthProvider
			// );

			setAuthData(undefined)
		},
		async logout() {
			// @ts-ignore
			await authService.logout()
			setAuthData(undefined)
		},
	}
}
