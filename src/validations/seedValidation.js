import * as yup from 'yup';

export const seedSchema = yup.object().shape({
  name: yup.string().required('This field is required').min(3),
});
