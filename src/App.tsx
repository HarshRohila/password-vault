import React from 'react';
import './App.scss';
import 'bootstrap/scss/bootstrap.scss';
import { Navbar } from './navbar';
import { GoogleLogin } from './button/GoogleLogin';
import { MasterPwdForm } from './forms/masterPassword';
import { AppRouter } from './AppRouter';

function App() {
	return (
		<div className="App">
			<AppRouter />
		</div>
	);
}

export default App;
