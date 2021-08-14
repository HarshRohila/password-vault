import React, { useEffect, useState } from 'react';
import { Login } from '../components/Login';
import { MasterPwdForm } from '../forms/masterPassword';
import useAuth from '../hooks/useAuth';

type HomePageProps = {};

export const HomePage = ({}: HomePageProps) => {
	const { isLoggedIn } = useAuth();

	useEffect(() => {}, []);

	return (
		<>
			<Login />
			{isLoggedIn && <MasterPwdForm />}
		</>
	);
};
