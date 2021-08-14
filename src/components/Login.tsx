import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Button } from '../ui/Button';

type LoginProps = {};

export const Login = ({}: LoginProps) => {
	const { login, isLoggedIn, logout } = useAuth();

	const handleSignIn = () => {
		login();
	};

	const handleSignOut = () => {
		logout();
	};

	return (
		<>
			{!isLoggedIn && <Button onClick={handleSignIn}>Sign In</Button>}
			{isLoggedIn && <Button onClick={handleSignOut}>Sign Out</Button>}
		</>
	);
};
