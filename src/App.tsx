import React from 'react';
import './App.scss';
import 'bootstrap/scss/bootstrap.scss';
import { Navbar } from './navbar';
import { GoogleLogin } from './button/GoogleLogin';
import { MasterPwdForm } from './forms/masterPassword';

function App() {
	return (
		<div className="App">
			<Navbar />
			<GoogleLogin />
			<MasterPwdForm />
		</div>
	);
}

export default App;
