import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { HomePage } from './pages/Home';

type AppRouterProps = {};

export const AppRouter = ({}: AppRouterProps) => {
	return (
		<Router>
			<RouterPage path="/" pageComponent={<HomePage />} />
		</Router>
	);
};

const RouterPage = (
	props: { pageComponent: JSX.Element } & RouteComponentProps
) => {
	return props.pageComponent;
};
