import axios from 'axios';
import {
  API_ERROR_500_MESSAGE,
  APP_ERROR_MESSAGE,
  API_ERROR_UNKNOWN_MESSAGE,
  API_ERROR_403_MESSAGE,
  API_ERROR_400_MESSAGE,
} from './config/variables';

const requestMethodsWithData = ['POST', 'PUT'];

export const getRemoteData = async (
  url,
  method,
  funcName,
  isAuthenticated,
  data,
) => {
  const response = {
    has_error: false,
    data: null,
    errors: [],
    status: '',
  };
  try {
    const requestObj = {
      url,
      method,
      validateStatus: (status) => {
        if (status >= 200 && status < 500) {
          return true;
        }
        return false;
      },
    };
    if (requestMethodsWithData.includes(method)) {
      requestObj.data = data;
    }
    if (isAuthenticated) {
      const token = localStorage.getItem('token');

      requestObj.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const serverResponse = await axios.request(requestObj);

    switch (serverResponse.status) {
      case 200:
        response.data = serverResponse.data;
        break;
      case 201:
        response.data = serverResponse.data;
        break;
      case 400:
        // let errors = serverResponse.data.error.message;
        console.log(
          `Bad request error  ${funcName}()`,
          serverResponse,
        );
        response.has_error = true;
        response.errors.push(API_ERROR_400_MESSAGE);
        response.errors.push(serverResponse.data.error.message);
        break;
      case 403:
        console.log(
          `Api server forbidden error  ${funcName}()`,
          serverResponse.data.error.message,
        );
        response.has_error = true;
        response.errors.push(API_ERROR_403_MESSAGE);
        break;
      case 500:
        console.log(
          `Api server error  ${funcName}()`,
          serverResponse.data.error.message,
        );
        response.has_error = true;
        response.errors.push(API_ERROR_500_MESSAGE);
        break;
      default:
        response.has_error = true;
        response.errors.push(API_ERROR_UNKNOWN_MESSAGE);
        console.log(
          `Unknown api server response status   ${funcName}()`,
          serverResponse,
        );
        break;
    }
  } catch (err) {
    console.log(`an error happened when ${funcName}()`, err);
    response.has_error = true;
    response.errors.push(APP_ERROR_MESSAGE);
  }

  return response;
};