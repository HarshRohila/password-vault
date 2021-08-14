import React, { useState } from 'react';
import newId from '../utils/newId';

type InputProps = {
	label: string;
	field: any;
};

export const Input = ({ field, label, ...props }: InputProps) => {
	const [id] = useState(newId());

	return (
		<>
			<div className="mb-3">
				{label && (
					<label htmlFor={id} className="form-label">
						{label}
					</label>
				)}
				<input className="form-control" id={id} {...field} {...props} />
			</div>
		</>
	);
};
