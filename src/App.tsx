import React from 'react';
import './App.scss';
import 'bootstrap/scss/bootstrap.scss';
import { Navbar } from './navbar';
import { GoogleLogin } from './button/GoogleLogin';

function App() {
	return (
		<div className="App">
			<Navbar />
			<GoogleLogin />
		</div>
	);
}

export default App;
