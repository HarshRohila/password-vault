import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAeLfGTWQtvJoiWFvWb1ZLsCDJ5xUHr8so',
	authDomain: 'password-vault-3327d.firebaseapp.com',
	projectId: 'password-vault-3327d',
	storageBucket: 'password-vault-3327d.appspot.com',
	messagingSenderId: '915366085425',
	appId: '1:915366085425:web:a15d33cd80e67d503aa610',
	databaseURL: 'test',
};

ReactDOM.render(
	<React.StrictMode>
		<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
			<App />
		</FirebaseAuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
