import * as yup from 'yup';

export const orderSchema = yup.object().shape({
  names: yup.string().required('This field is required'),
  landSize: yup.string().required('This field is required'),
  address: yup.string().required('This field is required'),
  fertilizer: yup
    .number()
    .required('This field is required')
    .test(
      'len',
      'Please select a fertilizer',
      (val) => val !== 'Select',
    ).typeError('Please select a valid fertilizer'),
  seed: yup
    .number()
    .required('This field is required')
    .test('len', 'Please select a seed', (val) => val !== 'Select')
    .typeError('Please select a valid seed'),
});
