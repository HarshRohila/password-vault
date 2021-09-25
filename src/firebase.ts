import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAeLfGTWQtvJoiWFvWb1ZLsCDJ5xUHr8so',
	authDomain: 'password-vault-3327d.firebaseapp.com',
	projectId: 'password-vault-3327d',
	storageBucket: 'password-vault-3327d.appspot.com',
	messagingSenderId: '915366085425',
	appId: '1:915366085425:web:a15d33cd80e67d503aa610',
	databaseURL: 'test',
};

firebase.initializeApp(firebaseConfig);

const Firebase = firebase;
export default Firebase;
