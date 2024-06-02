import * as yup from 'yup';

export const authSchema = yup.object().shape({
  names: yup.string().required('This field is required'),
  password: yup.string().required('This field is required').min(4),
});
