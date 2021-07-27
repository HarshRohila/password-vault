import React from 'react';
import firebase from 'firebase/app';

type GoogleLoginProps = {};

export const GoogleLogin = ({}: GoogleLoginProps) => (
	<button
		onClick={() => {
			const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(googleAuthProvider);
		}}
	>
		Sign In with Google
	</button>
);
