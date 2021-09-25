import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { CredsList } from './components/CredsList';
import { HomePage } from './pages/Home';

type AppRouterProps = {};

export const AppRouter = ({}: AppRouterProps) => {
	return (
		<Router>
			<RouterPage path="/" pageComponent={<HomePage />} />
			<RouterPage path="/credentials" pageComponent={<CredsList />} />
		</Router>
	);
};

const RouterPage = (
	props: { pageComponent: JSX.Element } & RouteComponentProps
) => {
	return props.pageComponent;
};
