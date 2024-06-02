/* eslint-disable consistent-return */
import { API_URL } from './config/variables';
import { getRemoteData } from './index';

export const createOrder = async (formValues) => {
  try {
    const url = `${API_URL}/order/create-order`;
    const res = await getRemoteData(
      url,
      'POST',
      'createOrder',
      false,
      {
        customerNames: formValues.names,
        customerAddress: formValues.address,
        landSize: formValues.landSize,
        totalFertilizerAmount: formValues.fertilizerAmount,
        totalSeedAmount: formValues.seedAmount,
        fertilizerId: formValues.fertilizer,
        seedId: formValues.seed,
      },
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - createOrder()', error);
  }
};

export const payOrder = async (id) => {
  try {
    const url = `${API_URL}/order/pay-order/${id}`;
    const res = await getRemoteData(url, 'PATCH', 'payOrder', false);
    return res;
  } catch (error) {
    console.log('Error caught helper - payOrder()', error);
  }
};

export const approveOrder = async (id) => {
  try {
    const url = `${API_URL}/order/approve-order/${id}`;
    const res = await getRemoteData(
      url,
      'PATCH',
      'approveOrder',
      false,
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - approveOrder()', error);
  }
};

export const rejectOrder = async (id) => {
  try {
    const url = `${API_URL}/order/reject-order/${id}`;
    const res = await getRemoteData(
      url,
      'PATCH',
      'rejectOrder',
      false,
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - rejectOrder()', error);
  }
};

export const getAllOrders = async (offset, limit) => {
  try {
    const url = `${API_URL}/order/orders/${offset}/${limit}`;
    const res = await getRemoteData(
      url,
      'GET',
      'getAllOrders',
      false,
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - getAllOrders()', error);
  }
};
