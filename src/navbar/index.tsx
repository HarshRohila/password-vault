import React from 'react';

// type NavbarProps = {};

export const Navbar = (/* {}: NavbarProps */) => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="container-fluid">
			<a className="navbar-brand" href="_self">
				Password Vault
			</a>
			<form className="d-flex">
				<input
					className="form-control me-2"
					type="search"
					placeholder="Search"
					aria-label="Search"
				></input>
				<button className="btn btn-outline-success" type="submit">
					Search
				</button>
			</form>
		</div>
	</nav>
);
