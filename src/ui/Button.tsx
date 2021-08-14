import React from 'react';

export const Button = ({ children, ...props }: any) => {
	return (
		<>
			<button className="btn btn-primary" {...props}>
				{children}
			</button>
		</>
	);
};
