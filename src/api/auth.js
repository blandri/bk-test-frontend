/* eslint-disable consistent-return */
import { API_URL } from './config/variables';
import { getRemoteData } from './index';

export const register = async (formValues) => {
  try {
    const url = `${API_URL}/user/register`;
    const res = await getRemoteData(
      url,
      'POST',
      'register',
      false,
      {
        names: formValues.names,
        password: formValues.password
      },
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - register()', error);
  }
};

export const login = async (formValues) => {
    try {
      const url = `${API_URL}/user/login`;
      const res = await getRemoteData(
        url,
        'POST',
        'login',
        false,
        {
          names: formValues.names,
          password: formValues.password
        },
      );
      return res;
    } catch (error) {
      console.log('Error caught helper - login()', error);
    }
  };
