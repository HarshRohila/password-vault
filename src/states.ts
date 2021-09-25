import { atom } from 'jotai'

const isLoggedIn = atom(false)
const authDataAtom = atom<gapi.auth2.GoogleUser | undefined>(undefined)
export { isLoggedIn, authDataAtom }
