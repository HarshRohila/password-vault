import { atom } from 'jotai'

const isLoggedIn = atom(false)
const authDataAtom = atom<boolean>(false)
export { isLoggedIn, authDataAtom }
