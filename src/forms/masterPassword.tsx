import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import MasterPwdValidation from '../validators/masterPwd';

type MasterPwdFormProps = {
	onSubmit?: (masterPwd: typeof initialValue) => void;
	isSubmitLoading?: boolean;
};

const initialValue = {
	masterPwd: '',
};

export const MasterPwdForm = ({
	onSubmit,
	isSubmitLoading,
}: MasterPwdFormProps) => {
	return (
		<>
			<Formik
				initialValues={initialValue}
				validationSchema={MasterPwdValidation}
				onSubmit={onSubmit ? onSubmit : () => {}}
			>
				{({ errors, touched }) => (
					<Form>
						<Field
							component={Input}
							type="password"
							name="masterPwd"
							label="Master Password"
						/>
						{console.log(errors)}
						{errors.masterPwd && touched.masterPwd ? (
							<div>{errors.masterPwd}</div>
						) : null}
						<Button type="submit">
							Submit
							{isSubmitLoading && <FontAwesomeIcon icon={faSpinner} spin />}
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
