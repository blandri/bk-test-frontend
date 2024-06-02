/* eslint-disable consistent-return */
import { API_URL } from './config/variables';
import { getRemoteData } from './index';

export const getAllSeeds = async () => {
  try {
    const url = `${API_URL}/product/seeds`;
    const res = await getRemoteData(url, 'GET', 'getAllSeeds', false);
    return res;
  } catch (error) {
    console.log('Error caught helper - getAllSeeds()', error);
  }
};

export const getAllFertilizers = async () => {
  try {
    const url = `${API_URL}/product/fertilizers`;
    const res = await getRemoteData(
      url,
      'GET',
      'getAllFertilizers',
      false,
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - getAllFertilizers()', error);
  }
};

export const createFertilizer = async (name) => {
  try {
    const url = `${API_URL}/product/create-fertilizer`;
    const res = await getRemoteData(
      url,
      'POST',
      'createFertilizer',
      false,
      {
        name: name
      },
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - createFertilizer()', error);
  }
};

export const createSeed = async (name) => {
  try {
    const url = `${API_URL}/product/create-seed`;
    const res = await getRemoteData(
      url,
      'POST',
      'createSeed',
      false,
      {
        name: name
      },
    );
    return res;
  } catch (error) {
    console.log('Error caught helper - createSeed()', error);
  }
};
