import * as Yup from 'yup';

const MasterPwdValidation = Yup.object().shape({
	masterPwd: Yup.string()
		.min(8, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
});

export default MasterPwdValidation;
