import * as yup from 'yup';

export const businessOwnerSchema = yup.object().shape({
  citizenShip: yup.string().required('This field is required'),
  idn: yup
    .string()
    .required(
      'Sorry, we can’t find your identification data from NIDA system. Please contact NIDA for more details.- This field is required',
    ),
  passNo: yup.string().required('This field is required'),
  otherNames: yup.string().required('This field is required'),
  nationality: yup.string().required('This field is required'),
  surname: yup.string().required('This field is required'),
  region: yup.string().required('This field is required'),
});
